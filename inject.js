// JavaScript source code

//output: all file name
//urls: file related urls
//types: file types



var browser = window.browser || window.chrome
var elements = document.getElementsByClassName("il_ContainerItemTitle")
var flags = [], output = [], l = elements.length, i;
for (i = 0; i < l; i++) {
    var txt = elements[i].innerText
    //use txt as a attribute
    if (flags[txt]) continue;
    flags[txt] = true;
    output.push(txt)
}
//console.log(output)
//var txt_ = elements.innerText
//console.log(elements)
var urls = [];
for(var x of elements) {
    let j = x.firstElementChild
    if (j != null) {
        if (j.innerHTML.indexOf('</a>') !== -1) {
            let url_ = j.innerHTML.match(/href="([^"]*")/g)
            urls.push(JSON.stringify(url_).slice(9, -4))
        }
    }
}
//now we have all the urls
//console.log(typeof urls[0])

var types = [];
var tp_ = selectall("span.il_ItemProperty")
var l = tp_.length, i;
for (i = 0; i < l; i++) {
    let j = tp_[i].innerHTML;
    j = j.match(/([a-z]+)&nbsp/g)
    if (j) { types.push(JSON.stringify(j).slice(2, -7)) }
    
}
console.log(types)
//now we have all the urls
//console.log(typeof urls[0])



function course() {
    this.store = [];
    this.add = function (key, value) {
        this.store[key] = value;
    };
}
var course_sum = new course();
var output_length = output.length, i;
for (i = 0; i < output_length;i++){
    course_sum.add(i, urls[i])
}
alert('courses found')
//document.dispatchEvent(new CustomEvent('csEvent', { detail: course_sum.store }));


/*
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.content === "fetchUrl") {
        sendResponse(course_sum.store)
    }
});*/
function selectall(selector) {
    return document.querySelectorAll(selector);
}
function select(selector) {
    return document.querySelector(selector);
}
var t = selectall("div.il_ContainerListItem")

//console.log(t)
function count() {
    console.log('hh')
    if (this.checked) {
        console.log(this.id)
    }
}


if(t){
    var aCheckbox = document.createElement("input");
    aCheckbox.setAttribute("type", "checkbox");
    aCheckbox.setAttribute("id", "allclick");
    aCheckbox.addEventListener('change', function () {
        if (this.checked) {
            var _selector = selectall('input[name=myCheckbox]');
            var l_ = _selector.length, i;
            for (i = 0; i < l_; i++) {
                _selector[i].checked = true;
            }
        }
        else {
            var _selector = selectall('input[name=myCheckbox]');
            var l_ = _selector.length, i;
            for (i = 0; i < l_; i++) {
                _selector[i].checked = false;
            }
        }
    });

    var txt1 = document.createTextNode('click to choose file for download!')
    var txt2 = document.createTextNode('click to select all!')
    var btn = document.createElement('button')
    btn.innerText = 'download';
    btn.addEventListener('click', function () {
        var tobedown = [],downname=[],downtp=[];
        var downidx = [];
        console.log('start downloading!')
        var _selector = selectall('input[name=myCheckbox]');
        var l_ = _selector.length, i;
        for (i = 0; i < l_; i++) {
            if (_selector[i].checked === true) {
                id_ = _selector[i].id;
                downidx.push(id_)
            };
        }
        
        console.log(course_sum.store.length)
        for (var i of downidx) {
            tobedown.push(course_sum.store[parseInt(i)]);
            downname.push(output[parseInt(i)]);
            downtp.push(types[parseInt(i)]);
        }
        alert('download     ' + tobedown);

        var l_ = tobedown.length, i;
        for (i = 0; i < l_; i++) {
            download_(tobedown[i], downname[i],downtp[i])
        }
        console.log('downloading completed!')
        function download_(url_,name,tp_) {


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
            var URLToPDF = url_;
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
                    type: 'application/'+tp_
                });

                // Generate file download directly in the browser !
                saveAs(file, name+'.'+tp_);
                //console.log('done downloading')
            };
            oReq.send();
        }

    }
    );

    var con_ = select("div.ilContainerItemsContainer")
    con_.appendChild(aCheckbox)
    con_.appendChild(txt2)
    con_.appendChild(btn)

    var l_ = t.length, i;
    for (i = 0; i < l_; i++) {
        var oCheckbox = document.createElement("input");
        oCheckbox.setAttribute("type", "checkbox");
        oCheckbox.setAttribute("id", i);
        oCheckbox.setAttribute("name", "myCheckbox");
        oCheckbox.addEventListener('change', function () {
            if (this.checked) {
                // Checkbox is checked..
                console.log(this.id)
            } else {
                // Checkbox is not checked..
            }
        });
        t[i].appendChild(oCheckbox);
        t[i].appendChild(txt1.cloneNode(true));
    }
    console.log('btn appended')

}





document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('input[name=myCheckbox]');
    _selector.addEventListener('change', function (event) {
        if (_selector.checked) {
            // do something if checked
        } else {
            // do something else otherwise
        }
    });
});
