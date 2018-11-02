/**
 * 二叉搜索树: 每个节点的左节点数小于节点， 右节点数大于节点
 */

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class BSTree {
  constructor() {
    this.root = null
  }

  /**
   * 插入数值
   * @param {Node} node 节点
   * @param {Int} data 数值
   */
  _insertNode(node, data) {
    if (node.data > data) {
      if (node.left === null) {
        node.left = new Node(data)
      } else {
        this._insertNode(node.left, data)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(data)
      } else {
        this._insertNode(node.right, data)
      }
    }
  }

  insertNode(data) {
    // 插入数值
    if (this.root === null) {
      this.root = new Node(data)
    } else {
      this._insertNode(this.root, data)
    }
  }
}

let t = new BSTree()
let lst = [4, 8, 7, 9, 3, 2, 1]

lst.forEach(item => {
  t.insertNode(item)
})
console.log(t.root)
