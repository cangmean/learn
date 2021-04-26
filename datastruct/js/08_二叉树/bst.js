/**
 * 二叉搜索树(二叉搜索树): 每个节点的左节点数小于节点， 右节点数大于节点 
 * 参考: https://xiaqiu2233.github.io/2017/10/11/%E5%88%A0%E9%99%A4%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E8%8A%82%E7%82%B9/
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

    find(data) {
        let node = this.root
        while (node) {
            if (node.data === data) {
                return node
            }

            if (node.data > data) {
                node = node.left
            } else {
                node = node.right
            }
        }
        return null
    }

    findParent(node) {
        let parent = null
        let current = this.root;
        while (current) {
            if (current === node) {
                return parent
            }

            parent = current

            if (current.data > node.data) {
                current = current.left
            } else {
                current = current.right
            }
        }

        return null
    }

    remove(data) {
        let node = this.find(data)
        let parent = this.findParent(node)

        // 如果节点不存在，返回
        if (!node) {
            return
        }

        // 第一种情况: 当搜索的节点时叶子节点的时候, 直接删除即可
        // 第二种情况: 删除的节点只有左子树，右子树(或只有右子树没有左子树), 只需要将唯一子节点替换成当前节点即可
        // 第三种情况: 删除的节点左子树和右子树均在的情况下， 从右子树中找出最小的节点替换为当前节点，并删除原右子树最小节点
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
        } else if (!node.left && node.right) {
            if (node === parent.left) {
                parent.left = node.right
            } else {
                parent.right = node.right
            }
        } else if (node.left && node.right) {
            // 如果删除的节点为左节点
            if (node === parent.left) {
                let prev = null
                let cur = node.right
                while (cur.left) {
                    prev = cur
                    cur = cur.left
                }
                // 把当前节点替换为最小节点
                parent.left = cur

                cur.left = node.left
                cur.right = node.right

                // 把最小子节点原有的位置删除
                prev.left = null

            } else {
                parent.right = node.left
                let cur = node.right
                let prev = null
                while (cur.left) {
                    prev = cur
                    cur = cur.left
                }
                parent.right = cur
                cur.left = node.left
                cur.right = node.right
                prev.left = null
            }
        }

    }
}


function main() {
    let t = new BSTree()
    t.insertNode(6)
    t.insertNode(3)
    t.insertNode(7)
    t.insertNode(8)
    t.insertNode(2)
    t.insertNode(5)
    t.insertNode(4)
    t.remove(3)
    console.log(t.root)
}

main()