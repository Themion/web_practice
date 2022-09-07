const clock = document.querySelector('#clock')

function setClock() {
    const date = new Date()

    const hr = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    const sec = String(date.getSeconds()).padStart(2, '0')

    clock.innerText = `${hr}:${min}:${sec}`
}

setClock()
setInterval(setClock, 100)
