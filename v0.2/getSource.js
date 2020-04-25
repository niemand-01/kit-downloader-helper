//video 中转界面1（kit blibliothek cloud）
/*
功能：
1.在html中寻找到视频原链接（bw.cloud.instance）
2.用window.open打开中转界面2,打开完成后关闭本界面

*/
setTimeout(getSource, 100)
function getSource() {
    let vid = document.querySelector("video");
    console.log(vid.currentSrc)
    chrome.runtime.sendMessage({
        action: 'getVideo',
        source: vid.currentSrc
    },
    function () {
        window.close()
    }
)
}


