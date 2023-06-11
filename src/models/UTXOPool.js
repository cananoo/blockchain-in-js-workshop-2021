import UTXO from './UTXO.js'
import {is} from "ramda";

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
      utxo.amount = utxo.amount + amount;
    }else {
        utxo.amount = amount;
    }
    this.utxos[miner] = utxo;
  }



  // 处理交易函数
  handleTransaction(trx,coinbaseBeneficiary) {
    if (this.isValidTransaction(trx)){
      if (trx.miner == coinbaseBeneficiary){
        this.utxos[trx.miner].amount = this.utxos[trx.miner].amount - trx.amount;
        if (this.utxos[trx.receiverspublickey] == null) {
          this.utxos[trx.receiverspublickey] = new UTXO();
          this.utxos[trx.receiverspublickey].amount += trx.amount;
        }else {
          this.utxos[trx.receiverspublickey].amount += trx.amount;
        }
      }else {
this.utxos[trx.miner].amount = this.utxos[trx.miner].amount - trx.amount - trx.transactionfee;
        if (this.utxos[trx.receiverspublickey] == null) {
          this.utxos[trx.receiverspublickey] = new UTXO();
          this.utxos[trx.receiverspublickey].amount += trx.amount;
        }else {
          this.utxos[trx.receiverspublickey].amount += trx.amount;
        }
         this.utxos[coinbaseBeneficiary].amount += trx.transactionfee;
      }
    }

  }

  // 验证交易合法性
  /**
   * 验证余额
   * 返回 bool
   */
  isValidTransaction(trx) {
    if (!trx.hasValidSignature()){
        return false;
    }
    if (this.utxos[trx.miner]){
      var utxo = this.utxos[trx.miner];
      if (utxo.amount >= trx.amount + trx.transactionfee){
        return true;
      }
    }
    return false;
  }
  // 将当前 UXTO 的副本克隆
  clone() {
    return new UTXOPool(this.utxos)
  }
}

export default UTXOPool
