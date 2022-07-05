import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------

interface Storage<T> {
    [key: string]: T
}

class LocalStorage<T> {
    constructor(
        private storage: Storage<T> = {}
    ) {}

    set(key: string, value: T) { this.storage[key] = value }
    get(key: string) { return this.storage[key] }
    clearKey(key: string) { delete this.storage[key]}
    clear() { this.storage = {} }
}

const localStorage = new LocalStorage<any>()
localStorage.set('hello', 'world')
