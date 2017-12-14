chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "http://llamaserver.net/";
  chrome.tabs.create({ url: newURL }, function (tab) {
  });
});