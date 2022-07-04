import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------

interface User {
    firstname: string
    lastname: string
    sayHi: (name: string) => string
    fullName: () => string
}

interface Human {
    health: number
}

class Player implements User, Human {
    constructor(
        public firstname: string,
        public lastname: string,
        public health: number
     ) { }
    fullName() { return `${this.firstname} ${this.lastname}` }
    sayHi(name: string) { return `Hello ${name}. My name is ${this.fullName()}` }
}

const player: Player = new Player("nick", "holand", 10)
console.log(player.sayHi("console"))
