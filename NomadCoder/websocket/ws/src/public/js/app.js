const socket = new WebSocket(`ws://${window.location.host}`)
const chatlist = document.querySelector("div#list")
const form = document.querySelector("form")
const nickname = form.querySelector("input#nickname")
const chat = form.querySelector("input#chat")
const button = form.querySelector("button")

socket.onopen = () => {
    console.log("Connected to Server")
}
socket.onmessage = (message) => {
    message = JSON.parse(message.data)

    console.log(message)

    chatlist.innerText += `${message.nickname}: ${message.chat}${"\n"}`
}
socket.onclose = () => {
    console.log("Disconnected from Server")
}

form.onsubmit = (event) => {
    event.preventDefault()
    socket.send(JSON.stringify({
        "nickname": nickname.value,
        "chat": chat.value
    }))
    chat.value = ""
}
