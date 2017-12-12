"use strict";

const structureReferenceSections = require('./structureReferenceListContent');

/**
 * Scan the DOM document for reference lists
 * @param {!String} document DOM document
 * @param {!Logger} logger a logger instance associated with the request
 */
function extractReferenceLists(document, logger) {
    const structure = [];
    let references = {};
    const refListElements = document.querySelectorAll('ol[typeof=\'mw:Extension/references\']');
    refListElements.forEach((refListElement) => {
        const result = structureReferenceSections.buildReferenceList(refListElement, logger);
        structure.push({
            type: 'reference_list',
            id: refListElement.getAttribute('about'),
            order: result.order
        });
        references = Object.assign(references, result.references);
    });
    return { structure, references };
}

module.exports = extractReferenceLists;