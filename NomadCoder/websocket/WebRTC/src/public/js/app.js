const socket = io()

const welcome = document.querySelector("div#welcome")
const welcomeForm = welcome.querySelector("form")
const welcomeInput = welcomeForm.querySelector("input")

const call = document.querySelector("div#call")
const video = call.querySelector("video")
const mute = call.querySelector("button#mute")
const cam = call.querySelector("button#cam")
const cams = call.querySelector("select#cams")

let myStream = null, 
    aud_on = false, 
    vid_on = false, 
    roomname = "", 
    myPeerConnection

async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter(device => device.kind === "videoinput")
        const current_camera = myStream.getVideoTracks()[0]
        cameras.forEach(camera => {
            const option = document.createElement("option")
            option.value = camera.deviceId
            option.innerText = camera.label

            if (current_camera.label === camera.label) option.selected = true

            cams.appendChild(option)
        })


    } catch (err) {
        console.log(err)
    }
}

async function getMedia(deviceId) {
    const init_constraint = {
        audio: true, video: { facingMode: "user" }
    }
    const cam_constraints = {
        audio: true, video: { deviceId: { exact: deviceId } }
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cam_constraints : init_constraint
        )
        if (!deviceId) await getCameras()

        video.srcObject = myStream
        aud_on = true
        vid_on = true
    } catch(err) {
        console.log(err)
    }
}

async function init() {
    welcome.hidden = true
    call.hidden = false
    await getMedia()
    makeConnection()
}

function makeConnection() {
    myPeerConnection = new RTCPeerConnection()
    myStream.getTracks().forEach((track) => {
        myPeerConnection.addTrack(track, myStream)
    })
}

welcomeForm.onsubmit = async (event) => { 
    event.preventDefault()
    await init()
    socket.emit("join_room", welcomeInput.value)
    roomname = welcomeInput.value
    welcomeInput.value = ""
}

mute.onclick = () => {
    aud_on = !aud_on
    myStream.getAudioTracks().forEach((track) => {track.enabled = aud_on});
    mute.innerText = aud_on ? "Mute" : "Unmute"
}
cam.onclick = () => {
    vid_on = !vid_on
    myStream.getVideoTracks().forEach((track) => {track.enabled = vid_on});
    cam.innerText = vid_on ? "Turn Cam On" : "Turn Cam Off"
}
cams.oninput = () => {
    getMedia(cams.value)
}

socket.on("welcome", async () => {
    const offer = await myPeerConnection.createOffer()
    myPeerConnection.setLocalDescription(offer)
    console.log("sending offer...")
    socket.emit("offer", offer, roomname)
})

socket.on("offer", async (offer) => {
    myPeerConnection.setRemoteDescription(offer)
    const answer = await myPeerConnection.createAnswer()
    console.log(answer)
})

call.hidden = true
