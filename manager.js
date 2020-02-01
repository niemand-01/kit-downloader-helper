// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

let changeColor = document.getElementById('changeColor');
changeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
};

let getUrlInfo = document.getElementById('getallC');
getUrlInfo.addEventListener('click', geturl_)
function geturl_() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "inject.js" },
            function () {
                console.log('inject succeed')
            });
    });
} 

//inject.js communication with manager.js failed
let openall = document.getElementById('openall');
getUrlInfo.addEventListener('click', openallintab_)
function openallintab_() {
    chrome.runtime.sendMessage({
        content: 'fetchUrl',
    },
    response => console.log(response));
    /*
    for (var entry of Object.entries(course_sum.store)) {
    console.log('opening    ' + entry[0]);
    open_(entry[1])
}
console.log('open succeedd')
*/
}
function open_() {
    var newURL = "https://ilias.studium.kit.edu/ilias.php?ref_id=1028583&cmdClass=ilrepositorygui&cmdNode=oo&baseClass=ilrepositorygui";
    chrome.tabs.create({ url: newURL });
}

function download_() {
    var das1 = "https://ilias.studium.kit.edu/goto.php?target=file_1022666_download&client_id=produktiv"

    var URL = window.URL || window.webkitURL;
    function saveAs(blob, filename) {
        var type = blob.type;
        var force_saveable_type = 'application/octet-stream';
        if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
            var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
            blob = slice.call(blob, 0, blob.size, force_saveable_type);
        }
        var url = URL.createObjectURL(blob);
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = url;
        save_link.download = filename;

        var event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
        });
        save_link.dispatchEvent(event);
        URL.revokeObjectURL(url);
    }
    var oReq = new XMLHttpRequest();
    // The Endpoint of your server
    var URLToPDF = das1;
    // Configure XMLHttpRequest
    oReq.open("GET", URLToPDF, true);
    // Important to use the blob response type
    oReq.responseType = "blob";
    // When the file request finishes
    // Is up to you, the configuration for error events etc.
    oReq.onload = function () {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        var file = new Blob([oReq.response], {
            type: 'application/pdf'
        });

        // Generate file download directly in the browser !
        saveAs(file, "mypdffilename.pdf");
        console.log('done downloading')
    };
    oReq.send();
}

function reqhtml_() {
    chrome.runtime.sendMessage({
        contentScriptQuery: 'fetchUrl',
        url: 'https://ilias.studium.kit.edu/ilias.php?ref_id=1028583&cmdClass=ilrepositorygui&cmdNode=oo&baseClass=ilrepositorygui'
    },
    response => console.log(response));
    console.log('sent msg')
}
var course_sum;
document.addEventListener('csEvent', function (event) {
    var data = event.detail;
    console.log(data)  
});
chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});




function open_(sub) {
    var newURL = "https://ilias.studium.kit.edu/" + sub;
    chrome.tabs.create({ url: newURL });
}