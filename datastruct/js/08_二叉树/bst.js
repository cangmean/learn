/**
 * 二叉搜索树(二叉搜索树): 每个节点的左节点数小于节点， 右节点数大于节点 
 */

class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
        this.parent = null
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
                node.left.parent = node // 用于删除时查找父节点
            } else {
                this._insertNode(node.left, data)
            }
        } else {
            if (node.right === null) {
                node.right = new Node(data)
                node.right.parent = node
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

    /**
     * 搜索
     * @param {Node} node 搜索的节点
     * @param {Int} data 数值
     */
    _searchNode(node, data) {
        // 把搜索的值和当前节点比较, 如果大于则递归搜索子节点, 小于则递归搜索右节点
        if (node.data > data) {
            if (node.left === null) {
                return null
            } else {
                return this._searchNode(node.left, data)
            }
        } else if (node.data < data) {
            if (node.right === null) {
                return null
            } else {
                return this._searchNode(node.right, data)
            }
        }

        return node
    }

    searchNode(data) {
        if (this.root === null) {
            return null
        } else {
            return this._searchNode(this.root, data)
        }
    }

    // 连接左子节点和右子节点
    joinRightNode(parent, child) {
        if (parent.right) {
            this.joinRightNode(parent.right, child)
        } else {
            parent.right = child
            child.parent = parent
        }
    }

    remove(data) {
        let node = this.searchNode(data)
        let parent = node.parent

        // 如果节点不存在，返回
        if (!node) {
            return
        }

        // 第一种情况: 当搜索的节点时叶子节点的时候, 直接删除即可
        // 第二种情况: 删除的节点只有左子树，右子树(或只有右子树没有左子树), 只需要将唯一子节点替换成当前节点即可
        // 第三种情况: 删除的节点左子树和右子树均在的情况下， 将左子树替换为当前节点， 并把原先的右子树设置为原先左子树的右子树(这里原先左子树有可能包含右子树所以需要递归)
        if (!node.left && !node.right) {
            if (node === parent.left) {
                parent.left = null;
            } else {
                parent.right = null
            }
        } else if (node.left && !node.right) {
            if (node === parent.left) {
                parent.left = node.left
            } else {
                parent.right = node.left
            }
            node.left.parent = parent
        } else if (!node.left && node.right) {
            if (node === parent.left) {
                parent.left = node.right
            } else {
                parent.right = node.right
            }
            node.right.parent = parent
        } else if (node.left && node.right) {
            if (node === parent.left) {
                parent.left = node.left
            } else {
                parent.right = node.left
            }
            // 连接节点
            this.joinRightNode(node.left, node.right)
        }

    }
}

let t = new BSTree()
let lst = [4, 8, 6, 7, 9, 3, 2, 1, 10]

lst.forEach(item => {
    t.insertNode(item)
})
t.remove(2)
console.log(t.searchNode(1))
console.log(t.root)
    // let n = t.searchNode(3)
    // let m = t.searchNode(2)
    // console.log(n)
    // console.log(m.parent)