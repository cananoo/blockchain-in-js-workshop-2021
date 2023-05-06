import sha256 from "crypto-js/sha256.js";

class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor( blockchain, previousHash, height, data ) {
    this.blockchain = blockchain
    this.previousHash = previousHash
    this.height = height
    this.data = data
    this.hash = this.hash()
  }

     // 2. 定义 hash 函数
    /*
        返回当前区块的 hash 值
     */
    hash(){
        return sha256(this.previousHash + this.height + this.data).toString()
    }

}

export default Block
