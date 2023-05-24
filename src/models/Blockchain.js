import UTXOPool from './UTXOPool.js'

class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name
    this.genesis = null
    this.blocks = {}
    this.utxoPool = new UTXOPool()
  }
  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let longestChain = []
      var HeightestBlock = this.maxHeightBlock()
      longestChain.push(HeightestBlock)
    while (this.blocks[HeightestBlock.previousHash]!= null) {
      longestChain.push(this.blocks[HeightestBlock.previousHash])
      HeightestBlock = this.blocks[HeightestBlock.previousHash]
    }
    return longestChain.reverse()
    }

  // 判断当前区块链是否包含
  containsBlock(block) {
    if (this.blocks[block.hash]) {
      return true
    } else {
      return false
    }
  }


// 获得区块高度最高的区块
 maxHeightBlock() {
     var temp = 0
     var HeightestBlock = null
     for (let block in this.blocks) {
         if (this.blocks[block].height >= temp) {
             temp = this.blocks[block].height
         }
     }
     for (let block in this.blocks) {
         if (this.blocks[block].height === temp) {
             HeightestBlock = this.blocks[block]
             return HeightestBlock
         }
     }
  }

  // 添加区块
  /*
  */
  _addBlock(block) {
    if (!block.isValid()) return
    if (this.containsBlock(block)) return

    // 添加 UTXO 快照与更新的相关逻辑
      for (let blo in this.blocks) {
          if (this.blocks[blo].height === block.height ) {
               var Selectblo = this.blocks[blo]
          }
      }
      if (Selectblo) {
          this.blocks[block.hash] = block
          return;
      }else {
          this.utxoPool.addUTXO(block.coinbaseBeneficiary,12.5)
          this.blocks[block.hash] = block
      }
  }
}
export default Blockchain
