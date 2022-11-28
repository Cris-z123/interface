const socket = new WebSocket("ws://localhost:8080")

/**
 * 链接状态
 * 0 连接中
 * 1 链接成功可以通讯
 * 2 连接关闭中
 * 3 连接已关闭或者没有链接成功
 */
let readState = socket.readyState

socket.addEventListener("open", e => {
    socket.send("Hello World")
})

socket.addEventListener("message", e => {
    console.log("Message from serve", e.data)
})

socket.addEventListener("error", e => {
    console.log(e.data)
})

socket.addEventListener("close", e => {
    console.log("Connection close")
})