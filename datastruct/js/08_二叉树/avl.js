/**
 * 平衡二叉树: AVL树的父节点和左右子树的高度差绝对值不超过 1 且每一个子树均为平衡二叉树.
 */


class Node {
    constructor(name, value) {
        this.name = name
        this.value = value
        this.height = 0
        this.left = null
        this.right = null
    }
}


class AVL {

    constructor() {
        this.root = null
    }

    getHeight(node) {
        // 空节点返回高度为 -1
        return node ? node.height : -1
    }

    unbalance(node) {
        return Math.abs(this.getHeight(node.left) - this.getHeight(node.right)) === 2
    }

    // 移动根节点
    transferRoot(top, node) {
        if (this.root === node) {
            this.root = top
        }
    }

    // 左左情况
    llRotate(node) {
        // top: 需要作为顶级节点的元素
        let top = node.left
        node.left = top.right

        top.right = node

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
        top.height = Math.max(this.getHeight(top.left), this.getHeight(top.right)) + 1

        this.transferRoot(top, node)
        return top
    }

    // 右右情况
    rrRotate(node) {
        let top = node.right

        node.right = top.left
        top.left = node

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
        top.height = Math.max(this.getHeight(top.left), this.getHeight(top.right)) + 1
        this.transferRoot(top, node)
        return top
    }

    // 左右情况
    lrRotate(node) {
        node = this.rrRotate(node)
        return this.llRotate(node)
    }

    // 右左情况
    rlRotate(node) {
        node = this.llRotate(node)
        return this.rrRotate(node)
    }

    /**
     * 
     * @param {Node} node 比较的节点
     * @param {Node} newNode 当前节点
     */
    _insert(node, newNode) {
        if (node.value > newNode.value) {
            if (node.left === null) {
                node.left = newNode
            } else {
                node.left = this._insert(node.left, newNode)

                // 如果添加节点后失衡
                if (this.unbalance(node)) {
                    if (newNode.value < node.left.value) {
                        // 左左情况
                        node = this.llRotate(node)
                    } else {
                        // 左右情况
                        node = this.lrRotate(node)
                    }
                }
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                node.right = this._insert(node.right, newNode)

                if (this.unbalance(node)) {
                    if (newNode.value > node.right.value) {
                        // 右右情况
                        node = this.rrRotate(node)
                    } else {
                        // 右左情况
                        node = this.rlRotate(node)
                    }
                }
            }

        }
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        return node
    }

    insert(node) {
        if (this.root === null) {
            this.root = node
        } else {
            this._insert(this.root, node)
        }
    }
}


function main() {
    let a = new Node('A', 1)
    let b = new Node('B', 2)
    let c = new Node('C', 3)
    let d = new Node('D', 4)
    let e = new Node('E', 5)
    let f = new Node('F', 7)
    let k = new Node('K', 0)

    let avl = new AVL()
    avl.root = d
    avl.insert(c)
    avl.insert(b)
    avl.insert(e)
    avl.insert(a)
    avl.insert(f)
    avl.insert(k)
    console.log(avl)
}

main()