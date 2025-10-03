// Manifest V3 background service worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "olx-highres",
    title: "Open in high-res viewer",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "olx-highres") {
    const url = info.srcUrl;
    const hiResUrl = url.replace(/;s=\d+x\d+/, ";s=10000x7000");
    
    // Send message to content script to open viewer
    chrome.tabs.sendMessage(tab.id, {
      action: "openViewer",
      imageUrl: hiResUrl
    });
  }
});