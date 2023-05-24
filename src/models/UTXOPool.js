import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos
  }

  // 添加交易函数
  /**
   * 将交易的信息更新至 UTXOPool 中
   */
  addUTXO(miner,amount) {
    var utxo = new UTXO()
    if (this.utxos[miner]){
      var utxo = this.utxos[miner];
      utxo.amount = utxo.amount + 12.5;
    }
    this.utxos[miner] = utxo;
  }



  // 处理交易函数
  handleTransaction() {}

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool
   */
  isValidTransaction() {}
  // 将当前 UXTO 的副本克隆
  clone() {
    return new UTXOPool(this.utxos)
  }
}

export default UTXOPool