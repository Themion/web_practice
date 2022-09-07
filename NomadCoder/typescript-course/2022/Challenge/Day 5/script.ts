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

    get(term: string) {
        return this.words[term]
    }
}

const word: Word = new Word("term", "def")
const dict = new Dict()
