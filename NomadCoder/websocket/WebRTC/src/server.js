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

io.on("connection", socket => {
    socket.on("join_room", (roomname) => {
        socket.join(roomname)
        socket.to(roomname).emit("welcome")
    })
    socket.on("offer", (offer, roomname) => {
        socket.to(roomname).emit("offer", offer)
    })
})

server.listen(port, () => console.log(`http://localhost:${port}`))
