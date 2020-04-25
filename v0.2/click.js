//video 首界面的注入脚本
/*
功能：
1.在html中寻找到视频中转链接
2.用click触发控件，不能新开一个网页，因为有session和内部js或者验证的问题

待解决：
1.一下子开2个window，监听器注入脚本（manifest里面）可以忙不过来？只能注入一个脚本
*/
setTimeout(getSource, 100)
function getSource() {
    let vid = document.querySelectorAll(".btn.btn-info");
    console.log(vid)
    for(let v of vid) {
        v.click()
    }

}