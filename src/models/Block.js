import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
          - 区块链
          - 前一个区块的哈希值
          - 区块高度
          - 区块哈希值
    */
  constructor(blockchain, previousHash, height, hash) {
    this.blockchain = blockchain
    this.previousHash = previousHash
    this.height = height
    this.hash = hash
  }

  isValid() {}

  setNonce(nonce) {}

}

export default Block
