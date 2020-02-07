const P = require('bluebird');

const DocumentWorker = require('../html/DocumentWorker');
const thumbnail = require('../thumbnail');
const NodeType = require('../nodeType');
const domUtil = require('../domUtil');
const pagelib = require('../../pagelib/build/wikimedia-page-library-transform');
const Edit = pagelib.EditTransform;
const WidenImage = pagelib.WidenImage;
const LazyLoad = pagelib.LazyLoadTransform;
const Table = pagelib.CollapseTable;
const LeadIntroduction = pagelib.LeadIntroductionTransform;
const Section = pagelib.SectionUtilities;
const ReferenceCollection = pagelib.ReferenceCollection;
const constants = require('./MobileHTMLConstants');
const head = require('../transformations/pcs/head');
const addPageHeader = require('../transformations/pcs/addPageHeader');
const parseProperty = require('../parseProperty');
const Reference = require('./Reference');

/**
 * MobileHTML is the preparer for mobile html output.
 * It handles the expensive transforms that need to be
 * applied to a Parsoid document in preparation for mobile display,
 * @param {!Document} doc Parsoid document to process
 */
class MobileHTML extends DocumentWorker {
/**
 * prepareElement receives every element as it is iterated
 * over and performs the required transforms. The DOM should
 * not be manipulated inside of this method. Instead, save
 * items for manipulation and perform the manipulation in
 * finalize
 * @param {!Element} element element to process
 */
  prepareElement(element) {
    // Accessibg attributes once and pass them into the required functions
    // improved performance over calling `getAttribute` multiple times.
    // Also, using precompiled regexes on the class string instead of the classList
    // proved to be more performant.
    const id = element.getAttribute('id');
    const tagName = element.tagName;
    const cls = element.getAttribute('class');
    if (this.isRemovableElement(element, tagName, id, cls)) {
      // save here to manipulate the dom later
      this.markForRemoval(element);
    } else {
      if (this.isTopLevelSection(tagName, element)) {
        this.checkForReferenceSection();
        this.currentSectionId = element.getAttribute('data-mw-section-id');
        // save for later due to DOM manipulation
        this.sections[this.currentSectionId] = element;
      } else if (this.isHeader(tagName)) {
        if (!this.headers[this.currentSectionId]) {
          this.headers[this.currentSectionId] = element;
        }
      } else {
        switch (tagName) {
          case 'A':
            this.prepareAnchor(element, cls);
            break;
          case 'LINK':
            this.makeSchemeless(element, 'href');
            break;
          case 'SCRIPT':
          case 'SOURCE':
            this.makeSchemeless(element, 'src');
            break;
          case 'IMG':
            this.prepareImage(element);
            break;
          case 'OL':
            this.prepareOrderedList(element, cls);
            break;
          case 'LI':
            this.prepareListItem(element, id);
            break;
          case 'SPAN':
            this.prepareSpan(element, cls);
            break;
          case 'DIV':
            this.prepareDiv(element, cls);
            break;
          case 'TABLE':
            // Images in tables should not be widened
            this.widenImageExcludedNode = element;
            this.prepareTable(element, cls);
            break;
          default:
            break;
        }

        if (!this.widenImageExcludedNode && constants.widenImageExclusionClassRegex.test(cls)) {
          this.widenImageExcludedNode = element;
        }

        if (this.themeExcludedNode) {
          element.classList.add('notheme');
        } else {
          const style = element.getAttribute('style');
          if (style && constants.inlineBackgroundStyleRegex.test(style)) {
            this.themeExcludedNode = element;
            element.classList.add('notheme');
          }
        }

      }

      // Perform these on all non-removeable elements
      const attributesToRemove = constants.attributesToRemoveFromElements[tagName];
      if (attributesToRemove) {
        for (const attrib of attributesToRemove) {
          element.removeAttribute(attrib);
        }
      }

      if (id && constants.mwidRegex.test(id)) {
        element.removeAttribute('id');
      }
    }
  }

  /**
   * Run the next finalization step. All of the DOM manipulation occurs here because
   * manipulating the DOM while walking it will result in an incomplete walk.
   */
  finalizeStep() {
    let node;

    this.checkForReferenceSection();

    node = this.nodesToRemove.pop();
    if (node) {
      const ancestor = node.parentNode;
      if (ancestor) {
        ancestor.removeChild(node);
      }
      return true;
    }

    node = this.infoboxes.pop();
    if (node) {
      this.prepareInfobox(node);
      return true;
    }

    node = this.redLinks.pop();
    if (node) {
      this.prepareRedLink(node, this.doc);
      return true;
    }

    node = this.lazyLoadableImages.pop();
    if (node) {
      LazyLoad.convertImageToPlaceholder(this.doc, node);
      return true;
    }

    if (!this.sectionIds) {
      this.sectionIds = Object.keys(this.sections);
    }

    const sectionId = this.sectionIds.pop();
    if (sectionId) {
      this.prepareSection(sectionId);
      return true;
    }

    node = this.references.pop();
    if (node) {
      this.prepareReference(node);
      return true;
    }

    const pcs = this.doc.createElement('div');
    pcs.setAttribute('id', 'pcs');
    const body = this.doc.body;
    const children = Array.from(body.children);
    for (const child of children) {
      /* DOM sink status: safe - content from parsoid output */
      pcs.appendChild(child);
    }
    /* DOM sink status: safe - content from parsoid output */
    body.appendChild(pcs);

    head.addCssLinks(this.doc, this.metadata);
    head.addMetaViewport(this.doc);
    head.addPageLibJs(this.doc, this.metadata);

    return false;
  }

  static get OutputMode() {
    return {
      contentAndReferences: 0,
      content: 1,
      references: 2
    };
  }

/**
 * Returns a MobileHTML object ready for processing
 * @param {!Document} doc document to process
 * @param {?Object} metadata metadata object that should include:
 *   {!string} baseURI the baseURI for the REST API
 *   {!string} revision the revision of the page
 *   {!string} tid the tid of the page
 * @param {?MobileHTML.OutputMode} outputMode
 */
  constructor(doc, metadata, outputMode = MobileHTML.OutputMode.contentAndReferences) {
    super(doc);
    this.prepareDoc(doc);
    this.nodesToRemove = [];
    this.lazyLoadableImages = [];
    this.redLinks = [];
    this.infoboxes = [];
    this.references = [];
    this.headers = {};
    this.sections = {};
    this.currentSectionId = '0';
    this.referenceSections = {};
    this.metadata = metadata || {};
    this.metadata.pronunciation = parseProperty.parsePronunciation(doc);
    this.metadata.linkTitle = domUtil.getParsoidLinkTitle(doc);
    this.metadata.plainTitle = domUtil.getParsoidPlainTitle(doc);
    this.outputMode = outputMode;
  }

/**
 * Adds metadata to the resulting document
 * @param {?Object} mw metadata from MediaWiki with:
 *   {!array} protection
 *   {?Object} originalimage
 *   {!string} displaytitle
 *   {?string} description
 *   {?string} description_source
 */
  addMediaWikiMetadata(mw) {
    this.metadata.mw = mw;
    head.addMetaTags(this.doc, this.metadata);
    if (this.outputMode !== MobileHTML.OutputMode.references) {
      addPageHeader(this.doc, this.metadata);
    }
  }

/**
 * Returns a promise that is fulfilled when processing completes.
 * See `constructor` for parameter documentation.
 */
  static promise(doc, metadata = {}, outputMode) {
    const mobileHTML = new MobileHTML(doc, metadata, outputMode);
    return mobileHTML.promise;
  }

/**
 * Run the next processing step.
 * @param {!DOMNode} node to process
 */
  process(node) {
    while (this.ancestor && this.ancestor !== node.parentNode) {
      if (this.ancestor === this.themeExcludedNode) {
        this.themeExcludedNode = undefined;
      }
      if (this.ancestor === this.currentInfobox) {
        this.currentInfobox = undefined;
      }
      if (this.ancestor === this.widenImageExcludedNode) {
        this.widenImageExcludedNode = undefined;
      }
      this.ancestor = this.ancestor.parentNode;
    }
    if (node.nodeType === NodeType.ELEMENT_NODE) {
      this.prepareElement(node);
    } else if (node.nodeType === NodeType.COMMENT_NODE) {
      this.markForRemoval(node);
    }
    this.ancestor = node;
  }

  // Specific processing:

  markForRemoval(node) {
    this.nodesToRemove.push(node);
  }

  isHeader(tagName) {
    return constants.headerTagRegex.test(tagName);
  }

  /**
   * Determines if an element is a reference list that should be treated
   * as an indicator that a section is dedicated to references. If the
   * reference list is inside of a table, this will return false
   * because that generally doesn't indicate a section that's dedicated to showing references.
   * @param {Element} element element to check
   * @param {string} classList class list string of the element. Faster than classList.contains
   * @return {boolean} true if the element is a reference list that isn't wrapped in a table
   */
  isIndicatorOfAReferenceSection(element, classList) {
    let parent = element.parentElement;
    while (parent) {
      if (parent.tagName === 'TD') {
        return false;
      } else if (parent.tagName === 'SECTION') {
        break;
      }
      parent = parent.parentElement;
    }
    return classList && classList.includes(constants.referenceListClassName);
  }

  /**
   * Determines whether an element is a <section> tag with the <body> tag as its parent
   * @param {string} tagName capitalized tag name of the element
   * @param {Element} element
   * @return {boolean} true if the element is a <section> tag and its parent is a <body> tag
   */
  isTopLevelSection(tagName, element) {
    return tagName === 'SECTION' && element.parentElement.tagName === 'BODY';
  }

  /**
   * @return {boolean} true if this document has sections with top level reflists
   */
  get hasReferenceSections() {
    return Object.keys(this.referenceSections).length !== 0;
  }

  /**
   * Mark the current section as a reference section if we've found and indicator that it is
   * a reference section. Reset the indicator if we found it. Also note if this is the first
   * reference section by saving the first reference section id.
   */
  checkForReferenceSection() {
    if (this.hasReferenceSections || this.foundIndicatorOfAReferenceSection) {
      if (!this.firstReferenceSectionId) {
        this.firstReferenceSectionId = this.currentSectionId;
      }
      this.referenceSections[this.currentSectionId] = this.sections[this.currentSectionId];
    }
    this.foundIndicatorOfAReferenceSection = false;
  }

  copyAttribute(src, dest, attr) {
    const value = src.getAttribute(attr);
    if (value !== null) {
        dest.setAttribute(attr, value);
    }
  }

  /**
   * Prepare a reference for mobile-html output. Adjusts the structure
   * of the HTML and adds the appropriate pcs hooks.
   * @param {Element} reference
   */
  prepareReference(reference) {
    if (!reference.textElement) {
      return;
    }
    const splitReference = reference.id.split('-');
    if (splitReference.length < 1) {
      return;
    }
    const lastSplit = splitReference[splitReference.length - 1];
    const referenceIntegerId = parseInt(lastSplit);
    if (referenceIntegerId <= 0) {
      return;
    }
    let child = reference.element.firstChild;
    while (child) {
      const toRemove = child;
      child = child.nextSibling;
      reference.element.removeChild(toRemove);
    }
    const containerDiv = this.doc.createElement('div');
    containerDiv.classList.add('pcs-reference');

    const numberDiv = this.doc.createElement('div');
    numberDiv.classList.add('pcs-reference-number');
    containerDiv.appendChild(numberDiv);

    const anchor = this.doc.createElement('a');
    anchor.innerHTML = `[${referenceIntegerId}]`;
    anchor.href = `./${this.metadata.linkTitle}${ReferenceCollection.BACK_LINK_FRAGMENT_PREFIX}${reference.id}`;
    anchor.setAttribute(
      ReferenceCollection.BACK_LINK_ATTRIBUTE,
      JSON.stringify(reference.backLinks)
    );
    numberDiv.appendChild(anchor);

    const referenceBodyDiv = this.doc.createElement('div');
    referenceBodyDiv.classList.add('pcs-reference-body');
    containerDiv.appendChild(referenceBodyDiv);

    referenceBodyDiv.appendChild(reference.textElement);

    reference.element.appendChild(containerDiv);
  }

  prepareSection(sectionId) {
    if (this.outputMode === MobileHTML.OutputMode.references) {
      this.prepareSectionForReferenceOutput(sectionId);
    } else {
      this.prepareSectionForCompleteOrContentOutput(sectionId);
    }
  }

  prepareSectionForCompleteOrContentOutput(sectionId) {
    const section = this.sections[sectionId];
    if (sectionId <= 0) {
      LeadIntroduction.moveLeadIntroductionUp(this.doc, section);
    }

    const isReference = this.outputMode === MobileHTML.OutputMode.contentAndReferences
      && this.referenceSections[sectionId];
    const header = this.headers[sectionId];
    this.prepareSectionHeader(header, section, sectionId, isReference, this.doc);
  }

  prepareSectionForReferenceOutput(sectionId) {
    const section = this.sections[sectionId];
    if (this.referenceSections[sectionId]) {
      const header = this.headers[sectionId];
      this.prepareSectionHeader(header, section, sectionId, false, this.doc);
    } else {
      section.parentNode.removeChild(section);
    }
  }

  prepareDoc(doc) {
    const body = doc.body;
    body.classList.add('content');
    Edit.setEditButtons(doc, false, false);
  }

  prepareRedLink(element, doc) {
    const span = doc.createElement('span');
    /* DOM sink status: safe - content from parsoid output */
    span.innerHTML = element.innerHTML;
    span.setAttribute('class', element.getAttribute('class'));
    /* DOM sink status: safe - content from parsoid output */
    element.parentNode.replaceChild(span, element);
  }

  prepareSectionHeader(header, section, sectionId, isReferenceSection, doc) {
    if (!header) {
      return;
    }

    if (sectionId === this.firstReferenceSectionId && section) {
      // Add HR before the first reference section
      Section.createFoldHR(this.doc, section);
    }

    if (isReferenceSection) {
      Section.prepareForHiding(doc, sectionId, section, header);
    }

    const headerWrapper = Edit.newEditSectionWrapper(doc, sectionId, header);
    if (header.parentNode === section) {
      section.insertBefore(headerWrapper, header);
    } else if (section.firstChild) {
      section.insertBefore(headerWrapper, section.firstChild);
    }
    Edit.appendEditSectionHeader(headerWrapper, header);
    const href = this.metadata.linkTitle ?
      `/w/index.php?title=${this.metadata.linkTitle}&action=edit&section=${sectionId}` : '';
    const link = Edit.newEditSectionLink(doc, sectionId, href);
    const button = Edit.newEditSectionButton(doc, sectionId, link);

    /* DOM sink status: safe - content from parsoid output */
    headerWrapper.appendChild(button);
  }

  isRemovableSpan(span, classList) {
    if (!span.firstChild) {
      return true;
    }
    if (constants.forbiddenSpanClassRegex.test(classList)) {
      return true;
    }
    if (constants.bracketSpanRegex.test(span.text)) {
      return true;
    }
    return false;
  }

  isRemovableDiv(div, classList) {
    return constants.forbiddenDivClassRegex.test(classList);
  }

  isRemovableLink(element) {
    return element.getAttribute('rel') !== 'dc:isVersionOf';
  }

  isRemovableElement(element, tagName, id, classList) {
    if (constants.forbiddenElementIDRegex.test(id)) {
      return true;
    }

    if (constants.forbiddenElementClassSubstringRegex.test(classList)) {
      return true;
    }

    if (constants.forbiddenElementClassRegex.test(classList)) {
      return true;
    }

    switch (tagName) {
    case 'DIV':
      return this.isRemovableDiv(element, classList);
    case 'SPAN':
      return this.isRemovableSpan(element, classList);
    case 'LINK':
      return this.isRemovableLink(element);
    default:
      return false;
    }
  }

  makeSchemeless(element, attrib) {
    const value = element.getAttribute(attrib);
    if (!value) {
      return;
    }
    const schemelessValue = value.replace(constants.httpsRegex, '//');
    element.setAttribute(attrib, schemelessValue);
  }

  isGalleryImage(image) {
    return (image.width >= 128);
  }

  prepareImage(image) {
    thumbnail.scaleElementIfNecessary(image);
    if (this.isGalleryImage(image)) {
      // Imagemaps, which expect images to be specific sizes, should not be widened.
      // Examples can be found on 'enwiki > Kingdom (biology)':
      //    - first non lead image is an image map
      //    - 'Three domains of life > Phylogenetic Tree of Life' image is an image map
      if (!this.widenImageExcludedNode && !image.hasAttribute('usemap')) {
        // Wrap in a try-catch block to avoid Domino crashing on a malformed style declaration.
        // T238700 which looks the same as T229521
        try {
          WidenImage.widenImage(image);
        } catch (e) { }
      }
      this.lazyLoadableImages.push(image);
    }
  }

  prepareAnchor(element, cls) {
    if (constants.newClassRegex.test(cls)) {
      this.redLinks.push(element);
    }
    const rel = element.getAttribute('rel');
    if (rel !== 'nofollow' && rel !== 'mw:ExtLink') {
      element.removeAttribute('rel');
    }
    this.makeSchemeless(element, 'href');
  }

  /**
   * Prepare an ordered list element for mobile html output
   * @param {Element} element
   * @param {string} cls
   */
  prepareOrderedList(element, cls) {
    if (this.isIndicatorOfAReferenceSection(element, cls)) {
      this.foundIndicatorOfAReferenceSection = true;
    }
  }

  prepareListItem(element, id) {
    if (id && id.startsWith(constants.citeNoteIdPrefix)) {
      const reference = new Reference(element, id);
      this.currentReference = reference;
      this.references.push(reference);
    }
  }

  prepareSpan(element, cls) {
    if (!this.currentReference || !cls) {
      return;
    }
    if (constants.linkbackClassRegex.test(cls)) {
      if (element.parentElement && element.parentElement.tagName === 'A') {
        const href = element.parentElement.getAttribute('href');
        if (href) {
          this.currentReference.backLinks.push(href);
        }
      }
    }
    if (constants.referenceClassRegex.test(cls)) {
      this.currentReference.textElement = element;
    }
  }

  prepareInfobox(infobox) {
    const node = infobox.element;
    const isInfoBox = infobox.isInfoBox;
    /* TODO: I18N these strings */
    const pageTitle = this.metadata.plainTitle;
    const title = isInfoBox ? 'Quick facts' : 'More information';
    const footerTitle = 'Close';
    const boxClass = isInfoBox ? Table.CLASS.TABLE_INFOBOX : Table.CLASS.TABLE_OTHER;
    const headerText = Table.getTableHeaderTextArray(this.doc, node, pageTitle);
    if (!headerText.length && !isInfoBox) {
      return;
    }
    Table.prepareTable(node, this.doc, pageTitle, title, boxClass, headerText, footerTitle);
  }

  markInfobox(element, cls, isDiv) {
    if (this.currentInfobox) {
      return;
    }
    const isInfoBox = constants.infoboxClassRegex.test(cls);
    if (isDiv && !isInfoBox) {
      return;
    }
    if (constants.infoboxClassExclusionRegex.test(cls)) {
      return;
    }
    let isHidden;
    // Wrap in a try-catch block to avoid Domino crashing on a malformed style declaration.
    // T229521
    try {
      isHidden = element.style.display === 'none';
    } catch (e) {
      // If Domino fails to parse styles, err on the safe side and don't transform
      isHidden = true;
    }
    if (isHidden) {
      return;
    }
    this.currentInfobox = element;
    this.infoboxes.push({ element, isInfoBox });
  }

  prepareDiv(element, cls) {
    this.markInfobox(element, cls, true);
  }

  prepareTable(element, cls) {
    this.markInfobox(element, cls, false);
  }
}

module.exports = MobileHTML;