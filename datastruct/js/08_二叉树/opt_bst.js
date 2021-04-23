/**
 * 最优二叉搜索树 
 * 动态规划转移方程: m[i, j] = min{m[i, k-1] + m[k+1, j] + w[i, j]}, 1<=i<=j<=n。 
 * m[i, j] 表示平均次数, w[i, j] 表示平均次数  其中 m[i, i-1] = 0
 * w[i, j] = ∑q(i-1, j)A(q) + ∑p(i, j)B(p) 空隙与节点的概率之和   A为空隙的概率，B为节点的概率
 * 参考: https://www.coursera.org/lecture/algorithms/047zui-you-er-cha-jian-suo-shu-de-suan-fa-wM4Zy
 * https://blog.csdn.net/xiajun07061225/article/details/8088784#
 */


class BST {
    constructor() {
        this.n = 5 // 节点个数
        this.p = [-1, 0.15, 0.1, 0.05, 0.1, 0.2] // 节点的查找概率
        this.q = [0.05, 0.1, 0.05, 0.05, 0.05, 0.1] // 空隙的查找概率

        this.w = this.makeMatrix(this.n + 2)
        this.m = this.makeMatrix(this.n + 2)
        this.r = this.makeMatrix(this.n + 1)
    }

    makeMatrix(n) {
        return Array.from({
            length: n
        }, () => new Array(n).fill(0))
    }

    fixed(x) {
        return parseFloat(x.toFixed(10))
    }

    search() {
        let n = this.n

        // 初始化，并将初始的 w[i][i-1] 记录下来
        for (let i = 1; i <= n + 1; i++) {
            this.w[i][i - 1] = this.q[i - 1]
            this.m[i][i - 1] = this.q[i - 1]
        }

        // console.log('w')
        // console.log('=========================')
        // console.log(this.w)
        // console.log('=========================')

        // 选择节点的长度
        for (let len = 1; len <= n; len++) {

            // 计算i到j的各个子树
            for (let i = 1; i <= n - len + 1; i++) {
                let j = i + len - 1
                this.m[i][j] = Infinity

                // 通过之前记录的概率重新计算新的概率
                this.w[i][j] = this.w[i][j - 1] + this.p[j] + this.q[j]
                this.w[i][j] = this.fixed(this.w[i][j])
                console.log(i, j, this.w[i][j])

                // k为树根的情况
                for (let k = i; k <= j; k++) {
                    // 转移方程式
                    let temp = this.m[i][k - 1] + this.m[k + 1][j] + this.w[i][j]
                    temp = this.fixed(temp)
                    if (temp < this.m[i][j]) {
                        this.m[i][j] = temp
                        this.r[i][j] = k
                    }
                }
            }

        }
    }

    showRoot() {
        let n = this.n
        console.log('r', this.r)
        console.log('各个子树的根: ')
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (i <= j) {
                    console.log(`r[${i}][${j}]: `, this.r[i][j])
                }
            }
            console.log('\n')
        }
    }

    showBST(i, j, r) {
        let n = this.n

        if (i <= n) {
            let root = this.r[i][j] // 子树根节点

            // 判断是不是整棵树的根节点
            if (root === this.r[1][n]) {
                console.log(`k: ${root} 是根`)
                this.showBST(i, root - 1, root)
                this.showBST(root + 1, j, root)
                return
            }

        }

        if (j < i - 1) {
            return
        } else if (j === i - 1) {
            // 节点空隙
            if (j < r) {
                console.log(`d[${j}]是k[${r}]的左子树`)
            } else {
                console.log(`d[${j}]是k[${r}]的右子树`)
            }
            return
        } else {
            // 内部结点
            let root = this.r[i][j] // 子树根节点
            if (root < r) {
                console.log(`k[${root}]是k[${r}]的左子树`)
            } else {
                console.log(`k[${root}]是k[${r}]的右子树`)
            }
        }

        let root = this.r[i][j] // 子树根节点
        this.showBST(i, root - 1, root)
        this.showBST(root + 1, j, root)

    }

}

function main() {
    let t = new BST()

    t.search()
    t.showRoot()
    t.showBST(1, t.n, -1)
}

main()