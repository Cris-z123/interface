const socket = new WebSocket("ws://localhost:8080")

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