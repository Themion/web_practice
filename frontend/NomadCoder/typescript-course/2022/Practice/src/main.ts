import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`


// ---------------------------

type Words = {
    [key: string]: string
}

class Word {
    constructor(
        public term: string,
        public def: string
    ) {}
}

class Dict {
    private words: Words
    constructor() {
        this.words = {} 
    }

    add(word: Word) {
        if (!this.words[word.term])
            this.words[word.term] = word.def
    }

    def(term: string) {
        return this.words[term]
    }
}

const word: Word = new Word("term", "def")
const dict = new Dict()

dict.add(word)
console.log(dict.def(word.term))
