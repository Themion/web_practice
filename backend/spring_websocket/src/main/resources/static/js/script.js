const WebSocketServer = '/websocket'
const WebSocketSubscribe = '/topic/messages'
const WebSocketSend = '/ws/message'

let stompClient;

const showMessage = (message) => {
    const messages = document.getElementById('messages')
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.innerText = message
    tr.appendChild(td)
    messages.appendChild(tr)
}

const connect = () => {
    const socket = new SockJS(WebSocketServer)
    stompClient = Stomp.over(socket)
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame)
        stompClient.subscribe(WebSocketSubscribe, (message) => {
            showMessage(JSON.parse(message.body).content)
        })
    })
}

const sendMessage = (event) => {
    const input = document.getElementById('input')

    event.preventDefault()

    console.log('sending message...')
    stompClient.send(
        WebSocketSend, 
        {}, 
        JSON.stringify({'content': input.value})
    )

    input.value = ""
}

const init = () => {
    const form = document.getElementById('form')
    form.onsubmit = sendMessage

    connect()
}

document.addEventListener('DOMContentLoaded', init)
