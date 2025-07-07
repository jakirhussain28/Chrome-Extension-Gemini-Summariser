document.addEventListener("DOMContentLoaded", () => {
  let currentCopiedText = ""; // Variable to store the currently copied text

  // Request the copied text from the background script
  chrome.runtime.sendMessage({ type: "GET_COPIED_TEXT" }, (response) => {
    currentCopiedText = response.text || "No text copied yet.";
    document.getElementById("copied-text").textContent = currentCopiedText;
  });

  const summarizeButton = document.getElementById("summarizeButton");
  summarizeButton.addEventListener("click", () => {
    if (currentCopiedText && currentCopiedText !== "No text copied yet.") {
      document.getElementById("summarized-text").textContent = "Summarizing...";
      fetch("http://127.0.0.1:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: currentCopiedText }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.summary) {
            document.getElementById("summarized-text").textContent = data.summary;
          } else if (data.error) {
            document.getElementById("summarized-text").textContent = "Error: " + data.error;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("summarized-text").textContent = "Error communicating with summarization service.";
        });
    } else {
      document.getElementById("summarized-text").textContent = "No text available to summarize.";
    }
  });
});