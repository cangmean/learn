/**
 * 红黑树
 * 1. 节点是红色或黑色
 * 2. 根节点是黑色
 * 3. 每个叶子节点是黑色(NIL或空节点)
 * 4. 每个红色节点的两个子节点都是黑色 (不存在两个连续的红色节点)
 * 5. 从任何一个节点到每个叶子节点的所有简单路径都包含相同数目的黑色节点
 * 参考: https://blog.csdn.net/sun_tttt/article/details/65445754
 * https://www.jianshu.com/p/00aae4f4d672
 * https://github.com/1921622004/leetcode-practice/blob/master/def/RedBlackTree.js
 * https://www.cnblogs.com/qingergege/p/7351659.html
 */


const BLACK = 'BLACK'
const RED = 'RED'


class Node {
    constructor(name, value) {
        this.name = name
        this.color = RED
        this.value = value
        this.left = null
        this.right = null
        this.parent = null
    }

    setBlack() {
        this.color = BLACK
    }

    setRed() {
        this.color = RED
    }

    isBlack() {
        return this.color === BLACK
    }

    isRed() {
        return this.color === RED
    }
}


class RedBlackTree {

    constructor() {
        this.root = null
    }

    // 移动根节点
    transferRoot(top, node) {
        if (this.root === node) {
            this.root = top
        }
    }

    // 对节点进行左旋
    leftRotate(node) {
        let parent = node.parent

        let top = node.right
        node.right = top.left

        top.left = node
        top.parent = parent
        node.parent = top

        if (parent) {
            if (parent.left === node) {
                parent.left = top
            } else {
                parent.right = top
            }
        }

        this.transferRoot(top, node)
        return top
    }

    // 对节点进行右旋
    rightRotate(node) {
        // 父节点
        let parent = node.parent

        let top = node.left
        node.left = top.right

        top.right = node
        top.parent = parent
        node.parent = top

        if (parent) {
            if (parent.left === node) {
                parent.left = top
            } else {
                parent.right = top
            }
        }

        this.transferRoot(top, node)
        return top
    }

    isBlack(node) {
        // NIL节点 当作黑色
        if (!node) {
            return true
        }
        return node.isBlack()
    }

    isRed(node) {
        if (!node) {
            return false
        }
        return node.isRed()
    }

    isLeaf(node) {
        return !node.left && !node.right
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

    _insertFix(node) {
        // N的父节点存在且父节点为红时不符合红黑树性质, 循环开始
        while (node.parent && this.isRed(node.parent)) {

            // 父红 叔红 祖黑 ===> 父黑 叔黑 祖红
            if (this.isRed(node.parent.parent.left) && this.isRed(node.parent.parent.right)) {
                node.parent.parent.left.setBlack()
                node.parent.parent.right.setBlack()
                node.parent.parent.setRed()
                node = node.parent.parent // 把祖当成新添加的N
                continue
            }

            // 父为祖 左节点
            if (node.parent === node.parent.parent.left) {
                let uncle = node.parent.parent.right
                let g = node.parent.parent

                // 父红 叔黑 祖黑: N(添加的节点)
                if (this.isBlack(uncle)) {

                    // N为左儿子
                    if (node === node.parent.left) {
                        node.parent.setBlack()
                        node.parent.parent.setRed()
                        this.rightRotate(g)
                    }

                    // N为右儿子
                    else if (node === node.parent.right) {
                        node.setBlack() // N变黑
                        node.parent.parent.setRed() // 祖变红
                        this.leftRotate(node.parent) // 父 左旋转
                        this.rightRotate(g) // 祖 右旋转
                    }
                }

            }

            // 父为祖 右节点
            else if (node.parent === node.parent.parent.right) {
                let uncle = node.parent.parent.left
                let g = node.parent.parent

                // 父红 叔黑 祖黑: N(添加的节点)
                if (this.isBlack(uncle)) {

                    // N为左儿子
                    if (node === node.parent.left) {
                        node.setBlack() // n变黑
                        node.parent.parent.setRed() // 祖变红
                        this.rightRotate(node.parent) // 父 右旋转
                        this.leftRotate(g) // 祖 左旋转
                    }
                    // N为右儿子
                    else if (node === node.parent.right) {
                        node.parent.setBlack() // 父变黑
                        node.parent.parent.setRed() // 祖变红
                        this.leftRotate(g) // 祖 左旋转
                    }
                }

            }
        }
        this.root.setBlack()
    }

    insert(value) {
        let node = new Node(value, value)
        if (this.root === null) {
            this.root = node
            this.root.setBlack() // 根节点为黑色
        } else {
            this._insert(this.root, node)
            this._insertFix(node)
        }
    }

    cover(oldNode, newNode) {
        // 覆盖原有的节点
        // 继承原有节点的父子节点
        newNode.left = oldNode.left
        newNode.right = oldNode.right
        newNode.parent = oldNode.parent

        if (oldNode.left) {
            oldNode.left.parent = newNode
        }

        if (oldNode.right) {
            oldNode.right.parent = newNode
        }
    }

    remove(value) {
        let node = this.find(value)
        if (!node) {
            return
        }

        // 如果删除的节点是红色的
        if (this.isRed(node)) {

            // 如果节点是叶子节点, 直接删除节点
            if (this.isLeaf(node)) {
                this._remove(node)
            }
            // 如果是一般节点, 则将替换的节点染成红色
            else {
                let parent = node.parent
                if (node === parent.left) {
                    this._remove(node)
                    parent.left.setRed()
                } else {
                    this._remove(node)
                    parent.right.setRed()
                }
            }
        }
        // 如果删除的节点是黑色的
        else if (this.isBlack(node)) {

            // 删除的节点有子树(因为性质5 存在的子树颜色必为红)
            // 这个时候子树染黑后替换原来的树即可
            if (node.left && !node.right) {
                node.left.setBlack()
            } else if (!node.left && node.right) {
                node.right.setBlack()
            }
            // 当节点包含左右子树, 根据性质左右子树必定都为红色
            else if (node.left && node.right) {
                let minNode = this.findMin(node.right)
                minNode.color = node.color

            }
            // 当节点为叶子节点
            else {
                // 删除的节点D
                // 父节点P
                // 兄弟节点S
                // 兄弟左节点SL, 兄弟右节点SR

                // 当D为P的左节点
                if (node === node.parent.left) {

                    let sibling = node.parent.right

                    // D黑 S红
                    if (this.isRed(sibling)) {
                        [node.parent.color, sibling.color] = [sibling.color, node.parent.color] // P和S互换
                        this.leftRotate(node.parent) // RR情况  P左旋转
                    }

                    // D黑 S黑 SR红(远侄子)
                    else if (this.isBlack(sibling) && this.isRed(sibling.right)) {
                        [node.parent.color, sibling.color] = [sibling.color, node.parent.color] // P和S互换
                        sibling.right.setBlack() // SR黑
                        this.leftRotate(node.parent)
                    }

                    // D黑 S黑 SL红(近侄子)
                    else if (this.isBlack(sibling) && this.isRed(sibling.left)) {
                        [sibling.color, sibling.left.color] = [sibling.left.color, sibling.color]
                        this.rightRotate(sibling) // RL情况 对S进行右旋转, 在对P进行左旋转
                        this.leftRotate(node.parent)
                    }

                    // D黑 S黑 P红 
                    else if (this.isBlack(sibling) && this.isRed(node.parent)) {
                        this.node.parent.setBlack() // P黑
                        sibling.setRed() // S红
                    }

                    // D黑 S黑 P黑 SL黑 SR黑
                    else if (this.isBlack(sibling) && this.isBlack(node.parent) && this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
                        sibling.setRed() // S红
                    }

                }
                // 当D为P的右节点
                else if (node === node.parent.right) {
                    let sibling = node.parent.left

                    // D黑 S红
                    if (this.isRed(sibling)) {
                        [node.parent.color, sibling.color] = [sibling.color, node.parent.color] // P和S互换
                        this.rightRotate(node.parent) // LL情况  P右旋转
                    }
                    // D黑 S黑 SL红(远侄子)
                    else if (this.isBlack(sibling) && this.isRed(sibling.left)) {
                        [node.parent.color, sibling.color] = [sibling.color, node.parent.color] // P和S互换
                        sibling.left.setBlack() // SR黑
                        this.rightRotate(node.parent) // LL情况  P左旋转
                    }

                    // D黑 S黑 SR红(近侄子)
                    else if (this.isBlack(sibling) && this.isRed(sibling.right)) {
                        [sibling.color, sibling.right.color] = [sibling.right.color, sibling.color]
                        this.leftRotate(sibling) // LR情况 对S进行左旋转，在对P进行右旋转
                        this.rightRotate(node.parent)
                    }

                    // D黑 S黑 P红
                    else if (this.isBlack(sibling) && this.isRed(node.parent)) {
                        this.node.parent.setBlack() // P黑
                        sibling.setRed() // S红
                    }

                    // D黑 S黑 P黑 SL黑 SR黑
                    else if (this.isBlack(sibling) && this.isBlack(node.parent) && this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
                        sibling.setRed() // S红
                    }

                }

            }

            this._remove(node) // 删除节点D

        }

    }

    _remove(node) {

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

                // 如果最小子节点为右节点
                if (minNode === node.right) {
                    node.right = null
                } else {
                    minNode.parent.left = null // 删除与原父节点之间联系
                }

                node.parent.left = minNode // 将与N替换 
                this.cover(node, minNode) // 覆盖删除的节点
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

                // 如果最小子节点为右节点
                if (minNode === node.right) {
                    node.right = null
                } else {
                    minNode.parent.left = null // 删除与原父节点之间联系
                }

                node.parent.right = minNode // 将与N替换
                this.cover(node, minNode) // 覆盖删除的节点
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

    findParent(node) {
        let parent = null
        let current = this.root;
        while (current) {
            if (current === node) {
                return parent
            }

            parent = current

            if (current.value > node.value) {
                current = current.left
            } else {
                current = current.right
            }
        }

        return null
    }

}

function main() {
    let t = new RedBlackTree()
    let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    arr.forEach(value => t.insert(value))
    console.log('=================RBT==============\n', t, '\n============================')
}

main()