const socket = io()

const welcome = document.querySelector("div#welcome")
const welcomeForm = welcome.querySelector("form#welcomeForm")
const roomname = welcome.querySelector("input#roomname")
const nickname = welcome.querySelector("input#nickname")
const roomlist = welcome.querySelector("ul#roomlist")

const room = document.querySelector("div#room")
const h3 = room.querySelector("h3#roomname")
const show_name = room.querySelector("div#show_name")

const editname = room.querySelector("form#nickname")
const editname_input = editname.querySelector("input#nickname")

const chats = room.querySelector("div#chats")
const chatForm = room.querySelector("form#chatForm")
const chat = chatForm.querySelector("input#chat")

// 채팅창에 메세지를 추가
function add_message(text) {
    chats.innerHTML += `
<div style="margin-bottom:1rem;">
    ${text}
</div>`
}

// 채팅창에 알림을 추가
function add_announce(text) {
    add_message(`
    <div style="margin: 0 auto;" align="center">
        <hr style="margin:0px;" /> 
        ${text}
        <hr style="margin:0px;" />
    </div>`)
}

// 채팅창에 나의 메세지를 추가
function add_my_message(text) {
    add_message(`
<div align="right">
    ${text}
</div>`)
}

// 방에 들어왔을 때 할 행동
function enter_room_callback (count) {
    // welcome을 숨긴 뒤 현재 방을 보여주고
    welcome.hidden = true
    room.hidden = false

    // 채팅방과 자신의 이름을 설정
    set_h3(count)
    show_name.innerText = nickname.value

    // 닉네임을 바꾸는 방법을 표시
    add_announce("You can change your nickname by clicking your name below roomname.")
}

// 이름을 바꿨을 때 할 행동
function change_name_callback (message) {
    // editname을 숨긴 뒤
    editname.hidden = true
    // 자신의 이름과 자신의 보여줄 이름을 바꾸고
    show_name.innerText = editname_input.value
    nickname.value = editname_input.value
    // editname_input을 초기화
    editname_input.value = ""
    // 내가 이름을 바꿨음을 표시
    add_announce(message)
}

// 채팅을 전송했을 때 할 행동
function chat_callback (message) {
    // 내가 보낸 채팅을 채팅창에 추가한 뒤 내 채팅 입력창을 비운다
    add_my_message(message)
    chat.value = ""
}

// room의 목록을 만들어 출력하는 함수
function set_roomlist (rooms) {
    // roomlist의 목록을 비운 뒤
    roomlist.innerHTML = ""
    // 인자로 들어온 방의 목록에 대해
    rooms.forEach((room) => {
        // 각 방의 이름을 담은 li를 만든 뒤
        const li = document.createElement("li")
        li.innerText = room
        // 이름을 누를 경우 해당 방의 이름을 roomname에 복사
        li.onclick = () => { roomname.value = li.innerText }
        // li를 roomlist에 추가
        roomlist.append(li)
    })
}

// 방 이름을 완성시키는 함수
function set_h3 (count) {
    h3.innerText = `${roomname.value}: (${count})`
}

// 맨 처음 홈페이지에 접속했을 때 할 행동
function init(message) {
    set_roomlist(message.roomlist)
}

// 공지가 발생할 때마다 공지를 추가
socket.on("announce", (announce) => { add_announce(announce) })
// 채팅방에 처음 들어갔을 때 공지를 추가하고 방 제목을 수정
socket.on("welcome", (message) => {
    add_announce(message.announce)
    set_h3(message.count)
})
// 누군가가 채팅방에서 나갔을 때 공지를 추가하고 방 제목을 수정
socket.on("bye", (message) => {
    add_announce(message.announce)
    set_h3(message.count)
})

// 채팅이 발생할 때마다 채팅을 추가
socket.on("chat", (chat) => { add_message(chat) })
// 방 목록이 바뀔 때마다 갱신
socket.on("room_change", (message) => { set_roomlist(message) })
// 사이트에 처음 들어왔을 때 init 함수를 실행
socket.on("init", init)

// show_name을 누를 때마다 hidden을 toggle
show_name.onclick = () => { editname.hidden = !(editname.hidden) }

// welcomeForm을 submit했을 때, 즉 방에 입장할 때
welcomeForm.onsubmit = (event) => {
    event.preventDefault()
    // enter_room 이벤트로 방 이름과 닉네임을 전송
    socket.emit(
        "enter_room", 
        { 
            roomname: roomname.value,
            nickname: nickname.value
        }, 
        // callback 함수 실행
        enter_room_callback
    )
}

// editname을 submit했을 때, 즉 이름을 바꿨을 때
editname.onsubmit = (event) => {
    event.preventDefault()
    // change_name 이벤트로 방 이름과 바꾼 닉네임을 전송
    socket.emit(
        "change_name", 
        {
            roomname: roomname.value,
            nickname: editname_input.value
        },
        // callback 함수 실행
        change_name_callback
    )
}

// chatForm을 submit했을 때, 즉 채팅을 전송했을 때
chatForm.onsubmit = (event) => {
    event.preventDefault();

    // chat 이벤트로 방 이름과 채팅을 전송
    socket.emit(
        "chat", 
        {
            roomname: roomname.value, 
            chat: chat.value
        }, 
        // callback 함수 실행
        chat_callback
    )
}

socket.emit("init", init)
