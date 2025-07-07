let copiedText = "";

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TEXT_SELECTED") {
    copiedText = message.text; // Store the selected text
  }

  if (message.type === "GET_COPIED_TEXT") {
    sendResponse({ text: copiedText }); // Send the stored text to the popup
  }
});