/* const age = parseInt(prompt("How old are you?"))

if (isNaN(age)) console.log("Write number")
else console.log(age) */

function set(a, b) {
    a = b
}

function handleTitleClick() {
    // 클래스가 있으면 remove, 없으면 add
    this.classList.toggle("active")
}
function handleTitleEnter () {
    this.innerText = "Mouse is here!"
}
function handleTitleLeave () {
    this.innerText = "Mouse is Gone!"
}
function handleWindowCopy (e) {
    e.preventDefault()
    alert('no copy!')
}

const titles = document.querySelectorAll('h1')
titles[1].innerText = 'Gotcha!'
// const mid = document.querySelector('h1.title#title3')
// mid.innerText = 'HAHAHA'
// document.querySelector('h1:first-child').style.color = 'blue'



titles.forEach((title) => {
    title.onclick = handleTitleClick.bind(title)
    title.onmouseenter = handleTitleEnter.bind(title)
    title.onmouseleave = handleTitleLeave.bind(title)
} )

window.addEventListener('resize', function() {
    document.body.style.backgroundColor = "tomato"
})
window.addEventListener('copy', handleWindowCopy)