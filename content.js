document.addEventListener("mouseup", () => {
    // Get the selected text
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText) {
      // Copy the selected text to the clipboard
      navigator.clipboard.writeText(selectedText).then(() => {
        console.log(`Copied to clipboard: ${selectedText}`);
  
        // Send the selected text to the background script
        chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text: selectedText });
      }).catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    }
  });