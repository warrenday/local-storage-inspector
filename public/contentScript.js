chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Request to get local storage
  if (message.action === "get-local-storage") {
    sendResponse({ data: localStorage });
    return;
  }

  // Requests to update local storage
  if (message.action === "clear-local-storage") {
    localStorage.clear();
  }
  if (message.action === "set-local-storage-item") {
    localStorage.setItem(message.data.key, message.data.value);
  }
  if (message.action === "remove-local-storage-item") {
    localStorage.removeItem(message.data.key);
  }

  // Send back the updated local storage
  sendResponse({ data: localStorage });
});
