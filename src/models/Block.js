import sha256 from 'crypto-js/sha256.js'
import UTXOPool from "./UTXOPool.js";
import {validateHash} from "../utils.js";

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
    // 存储交易的列表
    this.transactions = []
    // 交易的默克尔树根
    this.transactionsRoot = ''
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
// 根据交易变化更新区块 hash
  _setHash() {}

  // 汇总计算交易的 Hash 值
  /**
   * 根据区块中的所有交易计算的hash值（交易加入会更新hash） 简单实现 并未使用默克尔树
   */
  combinedTransactionsHash() {
    var newtransactionsRoot = ''
    this.transactions.forEach((transaction) => {
      newtransactionsRoot += transaction.hash
    })
    this.transactionsRoot = sha256(newtransactionsRoot).toString()
    return  this.transactionsRoot
  }

  // 添加交易到区块
  /**
   *
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(Transaction) {
    if (!validateHash(Transaction.hash)){
        throw new Error('Error: Transaction hash is invalid')
    }
      this.transactions.push(Transaction)
      this.utxoPool.handleTransaction(Transaction, this.coinbaseBeneficiary)
      this.combinedTransactionsHash()
  }
}
export default Block
