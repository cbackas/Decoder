// create selection context menu
browser.contextMenus.create({
    id: "decode-selection",
    title: "Decode",
    contexts: ["selection"]
});

// listener for selection context menu
browser.contextMenus.onClicked.addListener(handleContextMenuClicked);

function handleContextMenuClicked(info, tab) {
    switch (info.menuItemId) {
        case "decode-selection":
            browser.tabs.sendMessage(tab.id, "decode-selection").catch(onError);
            break;
    }
}

/**
 * Print errors to console
 * @param {error} error
 */
function onError(error) {
    console.error(`Error: ${error}`);
}