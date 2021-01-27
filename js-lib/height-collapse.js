/**
 * H5高度坍塌
 * 当页面出现同时出现下面三种情况的时候，键盘占位会把页面高度压缩一部分。当输入完成键盘占位消失后，页面高度有可能回不到原来高度。
 * 
 * 页面高度过小
 * 输出框在页面底部或视窗中下方
 * 输入框聚焦输入文本
 */


const input = document.getElementById("input");
let scrollTop = 0;

input.addEventListener("focus", ()=> {
    scrollTop = document.scrollingElement.scrollTop;
});

input.addEventListener("blur", ()=> {
    document.scrollingElement.scrollTo(0, this.scrollTop);
});
