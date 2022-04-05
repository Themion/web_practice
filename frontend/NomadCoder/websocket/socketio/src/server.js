import express from "express"
import http from "http"
import SocketIO from "socket.io"
/* import {Server} from "socket.io"
import {instrument} from "@socket.io/admin-ui" */
//import WebSocket from "ws"

const app = express()
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => res.render("home"))
app.get("/*", (req, res) => res.redirect("/"))

const server = http.createServer(app)
const io = SocketIO(server)
/* const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
})
instrument(io, {
    auth: false
}) */


function get_public_rooms() {
    const { sockets: { adapter: { sids, rooms } } } = io
    const public_rooms = []
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) public_rooms.push(key)
    })
    return public_rooms
}

function count_room(roomname) {
    return io.sockets.adapter.rooms.get(roomname)?.size
}

io.on("connection", (socket) => {
    socket.onAny((event) => { 
        console.log(`Event: ${event}`)
    })

    socket.on("enter_room", (message, callback) => {
        socket.join(message.roomname)
        socket.nickname = message.nickname
        socket.to(message.roomname).emit(
            "welcome",
            {
                announce: `Chatter ${socket.nickname} has come to our room!`,
                roomname: message.roomname,
                count: count_room(message.roomname)
            }
        )
        callback(count_room(message.roomname), socket.nickname)

        io.sockets.emit("room_change", get_public_rooms())
    })

    socket.on("chat", (message, callback) => {
        socket.to(message.roomname).emit(
            "chat", `${socket.nickname}: ${message.chat}`
        )
        callback(message.chat)
    })

    socket.on("change_name", (message, callback) => {
        socket.to(message.roomname).emit(
            "announce", 
            `${socket.nickname} has changed name to ${message.nickname}!`
        )
        callback(`You've changed name from ${socket.nickname} to ${message.nickname}!`)
        socket.nickname = message.nickname
    })

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit(
            "bye", 
            {
                announce: `Goodbye, ${socket.nickname}!`,
                count: count_room(room) - 1
            }
        ));
    })

    socket.on("disconnect", () => {
        io.sockets.emit("room_change", get_public_rooms())
    })

    socket.on("init", () => {
        socket.emit("init", {
            roomlist: get_public_rooms()
        })
    })
})

server.listen(port, () => console.log(`http://localhost:${port}`))
