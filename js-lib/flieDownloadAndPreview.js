/**
 * 文件下载
 * 请求url地址
 * 创建a标签
 * 设置a标签属性下载文档
 */


function download() {
    let link = document.createElement("a")
    let url = window.URL.createObjectURL(blob)
    let filename = "what-you-want.txt"
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
}





/**
 * 文件预览
 * 请求url地址
 * 创建a标签
 * 设置a标签属性预览文件
 */

function preview() {
    let link = document.createElement("a")
    link.href = url
}
