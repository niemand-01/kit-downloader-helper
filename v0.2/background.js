// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });
    /*
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'ilias.studium.kit.edu',
                    //urlMatches: 'ilias.studium.kit.edu/ilias.php?ref_id=1028584&cmd=view&cmdClass=ilrepositorygui&cmdNode=oo&baseClass=ilrepositorygui'
                },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });*/
});



chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.data === "getTabs") {
        console.info('get message')
    }
    if (msg.contentScriptQuery == 'fetchUrl') {
        // WARNING: SECURITY PROBLEM - a malicious web page may abuse
        // the message handler to get access to arbitrary cross-origin
        // resources.
        function reqListener() {
            var data = JSON.stringify(this.responseText);
            console.log(data);
        }

        function reqError(err) {
            console.log('Fetch Error :-S', err);
        }

        var oReq = new XMLHttpRequest();
        oReq.onload = reqListener;
        oReq.onerror = reqError;
        oReq.open('get', msg.url, true);
        oReq.send();
        return true;  // Will respond asynchronously.
    }

    sendResponse('ok');
    return true;

});

//get video web Urls
var videoNum = 0;
var videoName = '';

chrome.tabs.onCreated.addListener(function (tab) {
    //alert('new tab');


});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    /*
    if (changeInfo.status == "complete") {
        chrome.tabs.executeScript(tab.id,
{
    file: "getSource.js",
    runAt: "document_end",
},
function () { }
)
    }*/
});
chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == 'videoInfo') {
        //alert(request.source);
        videoNum = request.source.len;
        videoName = request.source.names;

    }
    if (request.action == "getVideo") {
        //alert(request.source);
        let url = request.source
        let i = 0;
        chrome.tabs.create({
            url:url
        })



    }
    if (request.action == "finalUrl") {
        chrome.downloads.download({
            url:request.source
        })
    }

})




