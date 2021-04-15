/*
原理: 通过实数集S = { s1, s2, s3 ... s} 来扩充二叉树, 其带权外部路径长度（WPL）达到最小的树称为哈夫曼树。
例子: {2, 3, 4, 11}  的WPL 可能为(34, 54, 40) 那么WPL为34的为树哈夫曼树。
实现: 通过优先队列，弹出最小的两个树，并构成新的子树，新的子树的根节点为两个树跟节点的和，
比如 (2, 3) 新的节点为 5, 并把树压入队列中一直循环，直到队列中只存在一颗树。
*/


class _Node {
    constructor(data = null, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }

    valueOf() {
        return this.data
    }
}

// 工厂函数
const Node = (data, left = null, right = null) => {
    return new _Node(data, left, right)
}
class PriorityQue {
    constructor(heap = []) {
        this.heap = heap
        this.build()
    }

    getSize() {
        return this.heap.length
    }

    upward(i) {
        // 向上筛选
        // i 是数组下标, 符合条件替换父子节点
        while (this._parent(i) >= 0 && i > 0) {
            if (this.heap[this._parent(i)] > this.heap[i]) {
                let tmp = this.heap[i]
                this.heap[i] = this.heap[this._parent(i)]
                this.heap[this._parent(i)] = tmp
            }
            i = this._parent(i)
        }
    }

    downward(i) {
        // 向下筛选， 获取子节点中最小值，替换父节点
        while (i * 2 <= this.getSize()) {
            let idx = this.minChild(i)

            if (this.heap[i] > this.heap[idx]) {
                let tmp = this.heap[idx]
                this.heap[idx] = this.heap[i]
                this.heap[i] = tmp
            }
            i = idx > 0 ? idx : 1
        }
    }

    minChild(i) {
        // 如果没有右子节点， 返回左子节点
        let left_idx = i * 2
        let right_idx = i * 2 + 1
        if (right_idx > this.getSize()) {
            return left_idx
        } else if (this.heap[left_idx] < this.heap[right_idx]) {
            return left_idx
        } else {
            return right_idx
        }
    }

    _parent(i) {
        // 父节点下标
        return Math.floor(i / 2)
    }

    enqueue(e) {
        // 压入堆中
        this.heap.push(e)
        this.upward(this.getSize())
    }

    dequeue() {
        // 弹出堆顶
        let e = this.heap[0]
        this.heap[0] = this.heap[this.getSize() - 1]
        this.heap.pop()
        this.downward(0)
        return e
    }

    build() {
        let i = this.getSize()
        while (i > 0) {
            this.upward(i)
            i -= 1
        }
    }
}


class Huffman {
    constructor(list) {
        this.tree = this.build(list)
    }

    build(list) {
        let nodes = list.map(item => Node(item))
        let que = new PriorityQue(nodes)

        while (que.getSize() > 1) {
            // 最小的节点出堆
            let t1 = que.dequeue()
            let t2 = que.dequeue()
            console.log('Get Node：', t1.data, t2.data, 'value: ', t1.data + t2.data)

            // 构成新的节点压入
            que.enqueue(Node(t1.data + t2.data, t1, t2))
        }
        return que.dequeue()
    }

}

let lst = [2, 3, 7, 4, 10, 2, 5]
let b = new Huffman(lst)

console.log(b.tree.data, b.tree.left.data, b.tree.right.data)