var base64 = require('base-64');

// when the tab recieves a message process them
browser.runtime.onMessage.addListener(handleMessage);

/**
 * Called every time the onMessage listener fires
 * Processes each message by decoding and whatnot
 * @param {string} message key indicating what message came through
 */
function handleMessage(message) {
    switch (message) {
        case "decode-selection":
            /**
             * For each range:
             * 1. Try to decode it best as possible
             * 2. Add all decoded lines to clipboard
             * 3. Update DOM so decoded texts are changed
             */
            var clipboardLines = [];
            getSelectionRanges().forEach((range) => {
                var originalText = range.toString();
                var decodedText = decodeString(originalText);

                // if decodedText didn't change then it wasn't base64
                // in that case we don't need to update the DOM or add it to clipboard
                if (originalText != decodedText) {
                    clipboardLines.push(decodedText);
                    updateDom(range.commonAncestorContainer, originalText, decodedText);
                }
            });

            if (clipboardLines.length != 0) {
                updateClipboard(clipboardLines.join("\n"));
            }
    }
}

/**
 * Get all the ranges that are currently selected
 * @returns {[Range]} array of ranges
 */
function getSelectionRanges() {
    var docSelection = document.getSelection();
    var ranges = [];

    for (var i = 0, len = docSelection.rangeCount; i < len; ++i) {
        ranges.push(docSelection.getRangeAt(i));
    }

    return ranges;
}

/**
 * Update the DOM to show the decoded string instead of the encoded one
 * @param {Node} node node to modify
 * @param {string} oldText original selected text
 * @param {string} newText text to replace original text with
 */
function updateDom(node, oldText, newText) {
    // var focusNode = document.getSelection().focusNode;
    node.textContent = node.textContent.replace(oldText, newText);
}

/**
 * Put passed in string in clipboard
 * @param {string} newText string to save to clipboard
 */
function updateClipboard(newText) {
    navigator.clipboard.writeText(newText);
}

/**
 * Keep base64 decoding a string until it can't be decoded anymore then return the decoded string
 * @param {string} string string to decode
 * @returns {string} decoded string
 */
function decodeString(string) {
    while (1) {
        try {
            string = base64.decode(string);
        } catch (error) {
            return string;
        }
    }
}