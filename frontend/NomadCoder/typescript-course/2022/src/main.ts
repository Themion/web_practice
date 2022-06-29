import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------


type Add = {
    (a: number, b: number): number
    (a: number, b: number, c: number): number
}

// const add: Add = (a, b, c) => {
const add: Add = (a, b, c?: number) => {
    if (c) return a + b + c
    return a + b
}

console.log(add(1, 2))
console.log(add(1, 2, 3))



type Config = {
    path: string,
    state: object,
}

type Push = {
    (path: string): void
    (config: Config): void
}

const push: Push = (config) => {
    if (typeof config === 'string') console.log(config)
    else console.log(config.path, config.state)
}

const config: Config = {
    path: "/home",
    state: {val: 1}
}

push(config)
