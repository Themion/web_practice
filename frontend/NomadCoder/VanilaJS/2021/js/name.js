const login_form = document.querySelector('#login-form')
const login_input = login_form.querySelector('input')
const h1 = document.querySelector('h1#greeting')

const NAME = "name"
const HIDDEN = "hidden"

function setName () {
    const name = localStorage.getItem(NAME)
    if (name === null) return

    login_form.classList.add(HIDDEN)

    h1.classList.remove(HIDDEN)
    h1.innerText = `Hello ${name}`
}

function onLoginSubmit (e) {
    e.preventDefault()
    localStorage.setItem(NAME, login_input.value)
    setName()
}

function init() {
    login_form.addEventListener("submit", onLoginSubmit)
    setName()
}

init()


/* function handleLinkClick (e) {
    console.log('link')
    e.preventDefault()
}

const link = document.querySelector("a")
link.addEventListener("click", handleLinkClick) */
