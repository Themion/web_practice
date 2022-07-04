import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------

interface User {
    name: string
}

interface User {
    lastName: string
}

interface User {
    age: number
}

const nick: User = {
    name: 'nick',
    lastName: 'lastName',
    age: 20
}

console.log(nick)
