import * as CryptoJS from "crypto-js"

class Block {
    public index: number
    public hash: string
    public prevHash: string
    public data: string
    public timestamp: number

    static calcBlockHash = (
        index: number,
        prevHash: string,
        timestamp: number,
        data: string
    ): string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString()

    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.prevHash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number"

    constructor (
        index: number,
        prevHash: string,
        hash: string,
        data: string,
        timestamp: number,
    ) {
        this.index = index
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
        this.timestamp = timestamp
    }
}

const genesisBlock: Block = new Block(0, "", "dfhjslknchmzshnw", "first block", new Date().getTime())
let blockChain: [Block] = [genesisBlock]

const getBlockChain = (): [Block] => blockChain
const getLastBlock = (): Block => getBlockChain()[blockChain.length - 1]
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)
const createNewBlock = (data: string): Block => {
    const prevBlock = getLastBlock()
    const index: number = prevBlock.index + 1
    const timestamp = getNewTimeStamp()
    const hash = Block.calcBlockHash(index, prevBlock.hash, timestamp, data)

    addBlock(new Block(index, prevBlock.hash, hash, data, timestamp))

    return blockChain[blockChain.length - 1]
}

const validateBlockHash = (candidateBlock: Block): boolean =>Block.calcBlockHash(
    candidateBlock.index, 
    candidateBlock.prevHash, 
    candidateBlock.timestamp, 
    candidateBlock.data
) === candidateBlock.hash

const isBlockValid = (candidateBlock: Block, prevBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) return false
    else if (prevBlock.index + 1 != candidateBlock.index) return false
    else if (prevBlock.hash != candidateBlock.prevHash) return false
    else return validateBlockHash(candidateBlock)
}

const addBlock = (candidateBlock: Block): void => {
    if (!isBlockValid(candidateBlock, getLastBlock())) return
    blockChain.push(candidateBlock)
} 

console.log(blockChain[0])
console.log(createNewBlock("second block"))
console.log(createNewBlock("third block"))
console.log(createNewBlock("fourth block"))
console.log(createNewBlock("fifth block"))

export {}
