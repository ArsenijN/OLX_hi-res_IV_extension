browser.contextMenus.create({
  id: "olx-highres",
  title: "Detailed view (high-res)",
  contexts: ["image"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "olx-highres") {
    const url = info.srcUrl;
    const newUrl = url.replace(/;s=\d+x\d+/, ";s=10000x7000");
    browser.tabs.update(tab.id, { url: newUrl });
  }
});