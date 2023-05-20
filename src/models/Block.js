import sha256 from 'crypto-js/sha256.js'
import UTXOPool from "./UTXOPool.js";

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
          - 区块链
          - 前一个区块的哈希值
          - 区块高度
          - 区块哈希值
    */
  constructor(blockchain, previousHash, height, hash,cointbaseBeneficiary) {
    this.blockchain = blockchain
    this.previousHash = previousHash
    this.height = height
    this.hash = hash
    this.nonce = ''
    this.utxoPool = this.blockchain.utxoPool
    this.coinbaseBeneficiary = cointbaseBeneficiary
  }

  isValid() {
    if (this.hash.startsWith('0'.repeat(DIFFICULTY))) {
      return true
    } else {
      return false
    }
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = sha256(this.nonce+this.previousHash).toString()
  }

    //计算hash函数
    static calcHash(block) {
    return sha256(block.nonce + block.previousHash).toString()
    }

}
export default Block
