import ElementUtilities from './ElementUtilities'
import Polyfill from './Polyfill'
import NodeUtilities from './NodeUtilities'

const REFERENCE_SELECTOR = '.reference, .mw-ref'
const CITE_FRAGMENT_PREFIX = '#cite_note-'
const BACK_LINK_FRAGMENT_PREFIX = '#pcs-reference-back-link-'
const BACK_LINK_ATTRIBUTE = 'pcs-back-links'


/**
 * Does this have the proper fragment prefix?
 * @param {!string} href
 * @param {?string} pageTitle - assumed to be encoded for links
 * @return {!boolean}
 */
const hasFragmentPrefix = (href, fragment, pageTitle) => {
  const decodedHref = decodeURIComponent(href)
  const decodedFragment = decodeURIComponent(fragment)
  if (pageTitle !== undefined) {
    const decodedPageTitle = decodeURIComponent(pageTitle)
    const relativePath = `./${decodedPageTitle}`
    return decodedHref.indexOf(relativePath) === 0 && href.indexOf(decodedFragment) === relativePath.length
  } else {
    return decodedHref.indexOf(decodedFragment) > -1
  }
}
  

/**
 * Is Citation.
 * @param {!string} href
 * @param {!string} pageTitle - assumed to be encoded for links
 * @return {!boolean}
 */
const isCitation = (href, pageTitle) => hasFragmentPrefix(href, CITE_FRAGMENT_PREFIX, pageTitle)

/**
 * Is Back Link.
 * @param {!string} href
 * @param {!string} pageTitle - assumed to be encoded for links
 * @return {!boolean}
 */
const isBackLink = (href, pageTitle) => hasFragmentPrefix(href, BACK_LINK_FRAGMENT_PREFIX, pageTitle)


/**
 * Determines if node is a text node containing only whitespace.
 * @param {!Node} node
 * @return {!boolean}
 */
const isWhitespaceTextNode = node =>
  Boolean(node) && node.nodeType === Node.TEXT_NODE && Boolean(node.textContent.match(/^\s+$/))

/**
 * Checks if element has a child anchor with a citation link.
 * @param {!Element} element
 * @return {!boolean}
 */
const hasCitationLink = element => {
  const anchor = element.querySelector('a')
  return anchor && isCitation(anchor.hash)
}

/**
 * Get the reference text container.
 * @param {!Document} document
 * @param {!Element} source
 * @return {?HTMLElement}
 */
const getRefTextContainer = (document, source) => {
  const refTextContainerID = source.querySelector('A').getAttribute('href').split('#')[1]
  const refTextContainer = document.getElementById(refTextContainerID)
    || document.getElementById(decodeURIComponent(refTextContainerID))

  return refTextContainer
}

/**
 * Extract reference text free of backlinks.
 * @param {!Document} document
 * @param {!Element} source
 * @return {!string}
 */
const collectRefText = (document, source) => {
  const refTextContainer = getRefTextContainer(document, source)
  if (!refTextContainer) {
    return ''
  }
  const refTextSpan = refTextContainer.querySelector('span.mw-reference-text')
  if (!refTextSpan) {
    return ''
  }
  return refTextSpan.innerHTML.trim()
}

/**
 * Get closest element to node which has class `reference`. If node itself has class `reference`
 * returns the node.
 * @param {!Node} sourceNode
 * @return {?HTMLElement}
 */
const closestReferenceClassElement = sourceNode => {
  if (Polyfill.matchesSelector(sourceNode, REFERENCE_SELECTOR)) {
    return sourceNode
  }
  return ElementUtilities.findClosestAncestor(sourceNode, REFERENCE_SELECTOR)
}

/**
 * Reference item model.
 */
class ReferenceItem {
  /**
   * ReferenceItem constructor.
   * @param {!string} id
   * @param {!DOMRect} rect
   * @param {?string} text
   * @param {?string} html
   * @param {?string} href
   */
  constructor(id, rect, text, html, href) {
    this.id = id
    this.rect = rect
    this.text = text
    this.html = html
    this.href = href
  }
}

/**
 * Reference item model.
 */
class ReferenceLinkItem {
  /**
   * ReferenceLinkItem construtor.
   * @param {!string} href
   * @param {?string} text
   */
  constructor(href, text) {
    this.href = href
    this.text = text
  }
}

/**
 * Converts node to ReferenceItem.
 * @param {!Document} document
 * @param {!Node} node
 * @return {!ReferenceItem}
 */
const referenceItemForNode = (document, node) => new ReferenceItem(
  closestReferenceClassElement(node).id,
  NodeUtilities.getBoundingClientRectAsPlainObject(node),
  node.textContent,
  collectRefText(document, node),
  node.querySelector('A').getAttribute('href')
)

/**
 * Converts node to ReferenceLinkItem.
 * @param {!Document} document
 * @param {!Node} node
 * @return {!ReferenceItem}
 */
const referenceLinkItemForNode = (document, node) => new ReferenceLinkItem(
  node.querySelector('A').getAttribute('href'),
  node.textContent
)

/**
 * Container for nearby references including the index of the selected reference.
 */
class NearbyReferences {
/**
 * @param {!number} selectedIndex
 * @param {!Array.<ReferenceItem>} referencesGroup
 * @return {!NearbyReferences}
 */
  constructor(selectedIndex, referencesGroup) {
    this.selectedIndex = selectedIndex
    this.referencesGroup = referencesGroup
  }
}

/**
 * Closure around a node for getting previous or next sibling.
 *
 * @typedef SiblingGetter
 * @param {!Node} node
 * @return {?Node}
 */

/**
  * Closure around `collectedNodes` for collecting reference nodes.
  *
  * @typedef Collector
  * @param {!Node} node
  * @return {void}
  */

/**
 * Get adjacent non-whitespace node.
 * @param {!Node} node
 * @param {!SiblingGetter} siblingGetter
 * @return {?Node}
 */
const adjacentNonWhitespaceNode = (node, siblingGetter) => {
  let currentNode = node
  do {
    currentNode = siblingGetter(currentNode)
  } while (isWhitespaceTextNode(currentNode))
  return currentNode
}

/**
 * Collect adjacent reference nodes. The starting node is not collected.
 * @param {!Node} node
 * @param {!SiblingGetter} siblingGetter
 * @param {!Collector} nodeCollector
 * @return {void}
 */
const collectAdjacentReferenceNodes = (node, siblingGetter, nodeCollector) => {
  let currentNode = node
  while (true) {
    currentNode = adjacentNonWhitespaceNode(currentNode, siblingGetter)
    if (!currentNode || currentNode.nodeType !== Node.ELEMENT_NODE
        || !hasCitationLink(currentNode)) {
      break
    }
    nodeCollector(currentNode)
  }
}

/* eslint-disable valid-jsdoc */
/** @type {SiblingGetter} */
const prevSiblingGetter = node => node.previousSibling

/** @type {SiblingGetter} */
const nextSiblingGetter = node => node.nextSibling
/* eslint-enable valid-jsdoc */

/**
 * Collect nearby reference nodes.
 * @param {!Node} sourceNode
 * @return {!Array.<Node>}
 */
const collectNearbyReferenceNodes = sourceNode => {
  const collectedNodes = [sourceNode]

  /* eslint-disable require-jsdoc */
  // These are `Collector`s.
  const collectedNodesUnshifter = node => collectedNodes.unshift(node)
  const collectedNodesPusher = node => collectedNodes.push(node)
  /* eslint-enable require-jsdoc */

  collectAdjacentReferenceNodes(sourceNode, prevSiblingGetter, collectedNodesUnshifter)
  collectAdjacentReferenceNodes(sourceNode, nextSiblingGetter, collectedNodesPusher)

  return collectedNodes
}

/**
 * Collect nearby reference nodes.
 * @param {!Node} sourceNode
 * @return {!Object}
 */
const collectReferencesForBackLink = (document, target, href) => {
  const backLinksJSON = target.getAttribute(BACK_LINK_ATTRIBUTE)
  if (!backLinksJSON) {
    return {}
  }
  const referenceId = href.split(BACK_LINK_FRAGMENT_PREFIX)[1]
  const backLinkHrefs = JSON.parse(backLinksJSON)
  if (!backLinkHrefs || backLinkHrefs.length == 0) {
    return {}
  }
  let backLinks = []
  // Used as fallback. Send the href of the first back link as the event href
  const firstBackLinkHref = backLinkHrefs[0]
  for (let i = 0; i < backLinkHrefs.length; i++) {
    const backLinkHref = backLinkHrefs[i]
    const id = backLinkHref.split('#')[1]
    const element = document.getElementById(id)
    if (!element) {
      continue
    }
    // Use an object with id to allow for adding more properties in the future
    backLinks.push({id})
  }
  return {referenceId, backLinks, href: firstBackLinkHref}
}


/**
 * Collect nearby references.
 * @param {!Document} document
 * @param {!Node} referenceElement
 * @return {!NearbyReferences}
 */
const collectNearbyReferenceForReferenceElement = (document, referenceElement) => {
  const referenceNodes = collectNearbyReferenceNodes(referenceElement)
  const selectedIndex = referenceNodes.indexOf(referenceElement)
  const referencesGroup = referenceNodes.map(node => referenceItemForNode(document, node))
  return new NearbyReferences(selectedIndex, referencesGroup)
}

/**
 * Collect nearby references.
 * @param {!Document} document
 * @param {!Node} sourceNode
 * @return {!NearbyReferences}
 */
const collectNearbyReferences = (document, sourceNode) => {
  const sourceNodeParent = sourceNode.parentElement // reference is the parent of the <a> tag
  return collectNearbyReferenceForReferenceElement(document, sourceNodeParent)
}

/**
 * Collect nearby references.
 * @param {!Document} document
 * @param {!Node} sourceNode
 * @return {!NearbyReferences}
 */
const collectNearbyReferencesAsText = (document, sourceNode) => {
  const sourceNodeParent = sourceNode.parentElement
  const referenceNodes = collectNearbyReferenceNodes(sourceNodeParent)
  const selectedIndex = referenceNodes.indexOf(sourceNodeParent)
  const referencesGroup = referenceNodes.map(node => referenceLinkItemForNode(document, node))
  return new NearbyReferences(selectedIndex, referencesGroup)
}

export default {
  collectNearbyReferences,
  collectNearbyReferencesAsText,
  collectReferencesForBackLink,
  isBackLink,
  isCitation,
  BACK_LINK_FRAGMENT_PREFIX,
  BACK_LINK_ATTRIBUTE,
  test: {
    adjacentNonWhitespaceNode,
    closestReferenceClassElement,
    collectAdjacentReferenceNodes,
    collectNearbyReferenceNodes,
    collectRefText,
    getRefTextContainer,
    hasCitationLink,
    isWhitespaceTextNode,
    nextSiblingGetter,
    prevSiblingGetter
  }
}