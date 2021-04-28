/**
 * 二叉搜索树(二叉搜索树): 每个节点的左节点数小于节点， 右节点数大于节点 
 * 参考: https://xiaqiu2233.github.io/2017/10/11/%E5%88%A0%E9%99%A4%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E7%9A%84%E8%8A%82%E7%82%B9/
 */



class Node {
    constructor(name, value) {
        this.name = name
        this.value = value
        this.left = null
        this.right = null
        this.parent = null
    }

}


class BST {

    constructor() {
        this.root = null
    }

    _insert(node, curNode) {

        if (node.value > curNode.value) {
            if (node.left === null) {
                node.left = curNode
                curNode.parent = node
            } else {
                node.left = this._insert(node.left, curNode)
            }
        } else {
            if (node.right === null) {
                node.right = curNode
                curNode.parent = node
            } else {
                node.right = this._insert(node.right, curNode)
            }
        }

        return node
    }


    insert(node) {
        if (this.root === null) {
            this.root = node
        } else {
            this._insert(this.root, node)
        }
    }

    remove(value) {

        let node = this.find(value)

        // 不存在节点
        if (!node) {
            return
        }

        // N为删除节点 以下是二叉搜索树的删除
        // 第一种情况: 当搜索的节点时叶子节点的时候, 直接删除即可
        // 第二种情况: 删除的节点只有左子树，右子树(或只有右子树没有左子树), 只需要将唯一子节点替换成当前节点即可
        // 第三种情况: 删除的节点左子树和右子树均在的情况下， 从右子树中找出最小的节点替换为当前节点，并删除原右子树最小节点

        // N为父节点的左子树
        if (node === node.parent.left) {

            // N为叶子节点
            if (!node.left && !node.right) {
                node.parent.left = null
            }

            // N只有左子树
            else if (node.left && !node.right) {
                node.parent.left = node.left // 左子树替换原N
                node.left.parent = node.parent // 左子树的父节点替换为N的父节点
            }
            // N只有右子树
            else if (!node.left && node.right) {
                node.parent.left = node.right // 右子树替换原N
                node.right.parent = node.parent // 右子树父节点替换为
            }
            // N包含左右子树
            else if (node.left && node.right) {
                let minNode = this.findMin(node.right) // 找出最小子节点
                minNode.parent.left = null // 删除与原父节点之间联系

                node.parent.left = minNode // 将与N替换
                minNode.left = node.left
                minNode.right = node.right
                minNode.parent = node.parent
            }

            // 将原节点的父节点关系删除
            node.parent = null
        }

        // N为父节点的右子树
        else if (node === node.parent.right) {

            // N为叶子节点
            if (!node.left && !node.right) {
                node.parent.right = null
            }

            // N只有左子树
            else if (node.left && !node.right) {
                node.parent.right = node.left // 左子树替换原N
                node.left.parent = node.parent // // 左子树的父节点替换为N的父节点
            }

            // N只有右子树
            else if (!node.left && node.right) {
                node.parent.right = node.right // 右子树替换原N
                node.right.parent = node.parent // 右子树父节点替换为
            }

            // N包含左右子树
            else if (node.left && node.right) {
                let minNode = this.findMin(node.right) // 找出最小子节点
                minNode.parent.left = null // 删除与原父节点之间联系

                node.parent.right = minNode // 将与N替换
                minNode.left = node.left
                minNode.right = node.right
                minNode.parent = node.parent
            }

            // 将原节点的父节点关系删除
            node.parent = null
        }

    }

    find(value) {
        let node = this.root
        while (node) {
            if (node.value === value) {
                return node
            }

            if (node.value > value) {
                node = node.left
            } else {
                node = node.right
            }
        }
        return null
    }

    findMin(node) {
        if (node.left) {
            return this.findMin(node.left)
        }
        return node
    }
}


function main() {
    let t = new BST()
    let arr = [6, 3, 7, 8, 2, 5, 4]
    arr.forEach(value => t.insert(new Node(value, value)))
    t.remove(3)
    console.log(t.root)
}

main()