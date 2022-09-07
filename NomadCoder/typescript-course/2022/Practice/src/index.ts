import crypto from 'crypto'

interface BlockShape {
    hash: string
    prevHash: string
    height: number
    data: string
}

class Block implements BlockShape {
    public hash: string
    constructor(
        public prevHash: string,
        public height: number,
        public data: string,
    ) {
        this.hash = Block.getHash(prevHash, height, data)
    }
 
    static getHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`
        return crypto
            .createHash("sha256")
            .update(toHash)
            .digest("hex")
    }
}

class BlockChain {
    private blocks: Block[]
    constructor() { this.blocks = [] }
    
    public getBlocks() { return [...this.blocks] }
    public getLength() { return this.getBlocks().length }
    public getLastHash() { 
        if (this.getLength() === 0) return ""    
        return this.blocks[this.getLength() - 1].hash
    }
    public addBlock(data: string) {
        this.blocks.push(new Block(
            this.getLastHash(), 
            this.getLength() + 1, 
            data
        ))
    }
}

const chain = new BlockChain()
chain.addBlock('first')
chain.addBlock('second')
chain.addBlock('third')
chain.addBlock('fourth')

console.log(chain.getBlocks())
