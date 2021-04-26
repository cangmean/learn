/**
 * 平衡二叉树: AVL树的父节点和左右子树的高度差绝对值不超过 1 且每一个子树均为平衡二叉树.
 * 参考: https://www.cnblogs.com/huangxincheng/archive/2012/07/22/2603956.html
 * https://zhuanlan.zhihu.com/p/90987593
 * https://blog.csdn.net/qq_21388535/article/details/105588488
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

    // 左左情况, 左子树的左节点 向右旋转
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

    // 右右情况, 右子树的右节点 向左旋转
    rrRotate(node) {
        let top = node.right

        node.right = top.left
        top.left = node

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
        top.height = Math.max(this.getHeight(top.left), this.getHeight(top.right)) + 1
        this.transferRoot(top, node)
        return top
    }

    // 左右情况， 左子树的右节点 先向左旋转在向右旋转
    lrRotate(node) {
        node.left = this.rrRotate(node.left)
        return this.llRotate(node)
    }

    // 右左情况, 右子树的左节点 先向右旋转在向左旋转
    rlRotate(node) {
        node.right = this.llRotate(node.right)
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
                    console.log('unbalance node --------->', node)
                    console.log('node.left --------->', node.left)
                    console.log('node.right --------->', node.right)
                    if (newNode.value > node.right.value) {
                        console.log('右右---', node)

                        // 右右情况
                        node = this.rrRotate(node)
                    } else {
                        console.log('右左---', node)

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

    rebalance() {}
}


function main() {
    let a = new Node('A', 6)
    let b = new Node('B', 4)
    let c = new Node('C', 2)
    let d = new Node('D', 1)
    let e = new Node('E', 3)
    let f = new Node('F', 5)
    let k = new Node('K', 7)

    let avl = new AVL()
    avl.insert(a)
    avl.insert(b)
    avl.insert(k)
    avl.insert(c)
    avl.insert(f)
    avl.insert(d)
    avl.insert(e)
    console.log(avl)
}


function test() {
    let a = new Node('A', 13)
    let b = new Node('B', 24)
    let c = new Node('C', 53)
    let d = new Node('D', 37)
    let e = new Node('E', 90)
    let f = new Node('F', 48)

    let avl = new AVL()
    avl.insert(b)
    avl.insert(c)
    avl.insert(a)
    avl.insert(e)
    avl.insert(d)
    avl.insert(f)
    console.log(avl)
}

test()