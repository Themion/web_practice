const WebSocketServer = '/websocket'
const WebSocketPublicResponse = '/topic/public'
const WebSocketPrivateResponse = '/user/topic/private'
const WebSocketPublicRequest = '/ws/public'
const WebSocketPrivateRequest = '/ws/private'
const PublicNotification = '/topic/notification/public'
const PrivateNotification = '/user/topic/notification/private'

let stompClient;
let notificationCount = 0

const updateNotification = (count) => {
    const span = document.querySelector('span')
    span.style.display = count ? 'inline' : 'none'
    span.innerText = count
    notificationCount = count
}

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
        stompClient.subscribe(WebSocketPublicResponse, (message) => {
            showMessage(JSON.parse(message.body).content)
        })
        stompClient.subscribe(WebSocketPrivateResponse, (message) => {
            showMessage(JSON.parse(message.body).content)
        })
        stompClient.subscribe(PublicNotification, (message) => {
            console.log("public notification : " + message)
            updateNotification(notificationCount + 1)
        })
        stompClient.subscribe(PrivateNotification, () => {
            updateNotification(notificationCount + 1)
        })
    })
}

const sendPublicMessage = (event) => {
    const input = event.target.querySelector('input')

    event.preventDefault()

    console.log('sending message...')
    stompClient.send(
        WebSocketPublicRequest, 
        {}, 
        JSON.stringify({'content': input.value})
    )

    input.value = ""
}

const sendPrivateMessage = (event) => {
    const input = event.target.querySelector('input')

    event.preventDefault()

    console.log('sending message...')
    stompClient.send(
        WebSocketPrivateRequest, 
        {}, 
        JSON.stringify({'content': input.value})
    )

    input.value = ""
}

const init = () => {
    const public = document.getElementById('public')
    public.onsubmit = sendPublicMessage
    const private = document.getElementById('private')
    private.onsubmit = sendPrivateMessage

    const span = document.querySelector('span')
    span.onclick = () => { updateNotification(0) }

    connect()
}

document.addEventListener('DOMContentLoaded', init)
