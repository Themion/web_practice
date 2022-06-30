import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------


type SuperPrint = {
    <T>(arr: T[]): void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4, 5])
superPrint([true, true, false, false, false])
superPrint(["a", "b", "c"])
superPrint(["a", "b", "c", 1, 2, false])
