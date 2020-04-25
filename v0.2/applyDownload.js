//最终视频地址界面
/*
功能：
0.获取界面url window.location.href
1.下载本视频
    1.1方法1：创建HTML5虚拟控件<a>，带有download attribute,自定义event,并且dispatch这个event，实现不播放下载
    1.2方法2：尝试返回给background.js，使用chrome.downloads.download下载？
2.关闭本界面
*/
let url = window.location.href;
chrome.runtime.sendMessage({
    action: 'finalUrl',
    source: url
    },
    function() {
        window.close()
    }
)