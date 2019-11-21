"use strict";
// https://eu-west-1a.online.tableau.com/t/infotopicsonline/views/Gender/Sheet1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log("The color is green.");
//   });
// });

chrome.browserAction.onClicked.addEventListener(function() {
  chrome.tabs.create({ url: "chrome://newtab" });
});
