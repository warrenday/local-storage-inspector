// Open website on install
// chrome.runtime.onInstalled.addListener(function (details) {
//   if (details.reason === "install") {
//     chrome.tabs.create({ url: "https://www.overstacked.io" });
//   }
// });

console.log("background script loaded!");

const getTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};

// Background script is just a relay between devtools and the content script.
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name !== "local-storage-inspector-devtools") {
    return;
  }

  port.onMessage.addListener(async function (message) {
    // Forward the message to the content script
    const activeTab = await getTab();
    chrome.tabs.sendMessage(activeTab.id, message, function (response) {
      port.postMessage(response);
    });
  });
});
