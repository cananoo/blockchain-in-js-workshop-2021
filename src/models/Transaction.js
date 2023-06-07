import sha256 from 'crypto-js/sha256.js'


class Transaction {
  constructor(miner,receiverspublickey,amount,transactionfee) {
    this.miner = miner
    this.receiverspublickey = receiverspublickey
    this.amount = amount
    this.transactionfee = transactionfee
    this._setHash()
  }




  // 更新交易 hash
  _setHash() {
   this.hash = this._calculateHash()
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(
      this.miner + this.receiverspublickey + this.amount+this.transactionfee).toString()
  }
}

export default Transaction