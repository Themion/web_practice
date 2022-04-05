import express from "express"
import http from "http"
import WebSocket from "ws"

const app = express()
const port = 3000

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => res.render("home"))
app.get("/*", (req, res) => res.redirect("/"))

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const socketList = []

wss.on("connection", (socket) => {
    socketList.push(socket)
    socket.onopen = () => { 
        console.log("Connected to Browser")
    }
    socket.onclose = () => { 
        console.log("Disconnected from Browser") 
    }
    socket.onmessage = (message) => {
        console.log(message.data)
        socketList.forEach((skt) => { skt.send(message.data) })
    }
})
wss.on("listening", () => {})

server.listen(port, () => console.log(`http://localhost:${port}`))
