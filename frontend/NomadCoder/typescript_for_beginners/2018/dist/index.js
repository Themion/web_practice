"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, prevHash, hash, data, timestamp) {
        this.index = index;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calcBlockHash = (index, prevHash, timestamp, data) => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.prevHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";
const genesisBlock = new Block(0, "", "dfhjslknchmzshnw", "first block", new Date().getTime());
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLastBlock = () => getBlockChain()[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const prevBlock = getLastBlock();
    const index = prevBlock.index + 1;
    const timestamp = getNewTimeStamp();
    const hash = Block.calcBlockHash(index, prevBlock.hash, timestamp, data);
    addBlock(new Block(index, prevBlock.hash, hash, data, timestamp));
    return blockChain[blockChain.length - 1];
};
const validateBlockHash = (candidateBlock) => Block.calcBlockHash(candidateBlock.index, candidateBlock.prevHash, candidateBlock.timestamp, candidateBlock.data) === candidateBlock.hash;
const isBlockValid = (candidateBlock, prevBlock) => {
    if (!Block.validateStructure(candidateBlock))
        return false;
    else if (prevBlock.index + 1 != candidateBlock.index)
        return false;
    else if (prevBlock.hash != candidateBlock.prevHash)
        return false;
    else
        return validateBlockHash(candidateBlock);
};
const addBlock = (candidateBlock) => {
    if (!isBlockValid(candidateBlock, getLastBlock()))
        return;
    blockChain.push(candidateBlock);
};
console.log(blockChain[0]);
console.log(createNewBlock("second block"));
console.log(createNewBlock("third block"));
console.log(createNewBlock("fourth block"));
console.log(createNewBlock("fifth block"));
//# sourceMappingURL=index.js.map