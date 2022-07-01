import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------


abstract class User {
    constructor(
        private firstName: string,
        protected lastName: string,
        public nickname: string
    ) {}

    private getNickname() { return this.nickname }

    abstract getLastname(): void

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}


class Player extends User {
    getLastname(): void {
        console.log(this.lastName)
    }
}

// const user = new User('first', 'last', 'user')
const nick = new Player('first', 'last', 'nick');

// console.log(nick.getNickname())
console.log(nick.getFullName())
