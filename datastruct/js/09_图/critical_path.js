/**
 * 关键路径
 * 参考: https://blog.csdn.net/zjw_python/article/details/86064569
 *      https://www.jianshu.com/p/7819f9cb379c
 * 
 */


class Vertex {
    constructor(name) {
        this.name = name
        this.weight = 0
        this.in = 0
        this.firstEdge = null;
    }

    setEdge(edge) {
        if (!this.firstEdge) {
            this.firstEdge = edge;

            // 邻接顶点入度加一
            edge.adjver.in += 1
            return
        }

        if (edge === this.firstEdge) {
            return
        }

        let temp = this.firstEdge
        while (temp) {
            let next = temp.next
            if (!next) {
                temp.next = edge
                edge.adjver.in += 1
                break
            }

            temp = next
        }
    }
}


class Edge {
    constructor(vertex, weight) {
        this.adjver = vertex // 邻接顶点
        this.weight = weight
        this.next = null
    }
}


class Graph {
    constructor(vertexes, edgeNumber) {
        this.vertexes = vertexes;
        this.number = this.vertexes.length;
        this.edgeNumber = edgeNumber
    }

    // 拓扑排序
    getEtv() {
        let etv = []
        let que = []
        let result = []

        // 将入度为0的添加到队列中
        for (let i = 0; i < this.number; i++) {
            etv[i] = 0
            if (this.vertexes[i].in === 0) {
                que.push(i)
            }
        }

        while (que.length > 0) {
            let i = que.shift()

            let v = this.vertexes[i]

            // 加入到队列中
            result.push(i)

            // 邻接边
            let e = v.firstEdge

            while (e) {

                // 获取邻接顶点的下标
                let k = this.vertexes.indexOf(e.adjver)

                // 邻接顶点入度减一, 当入度为0时放入队列中
                if (e.adjver.in !== 0) {
                    e.adjver.in -= 1
                }

                if (e.adjver.in === 0) {
                    que.push(k)
                }

                // 取最大值
                if (etv[i] + e.weight > etv[k]) {
                    etv[k] = etv[i] + e.weight
                }

                e = e.next
            }

        }

        return {
            etv,
            que: result
        }
    }

    /**
     * 
     * @param {Array} etv 事件最早发生的时间
     * @param {Array} que // 拓扑排序的事件队列
     */
    getLtv(etv, que) {
        let ltv = []

        // 初始化，ltv反向查询
        for (let i = 0; i < this.number; i++) {
            ltv[i] = etv[this.number - 1]
        }

        while (que.length > 0) {
            let i = que.pop()

            let v = this.vertexes[i]
            let e = v.firstEdge

            while (e) {
                let k = this.vertexes.indexOf(e.adjver)
                if (ltv[i] > ltv[k] - e.weight) {
                    ltv[i] = ltv[k] - e.weight
                }

                e = e.next
            }


        }
        return ltv
    }

    criticalPath() {
        let { etv, que } = this.getEtv()
        console.log('etv', etv)

        let ltv = this.getLtv(etv, que)
        console.log('ltv', ltv)

        let ete = 0; // 活动最早开始的时间
        let lte = 0; // 活动最晚开始的时间

        for (let i = 0; i < this.number; i++) {
            let e = this.vertexes[i].firstEdge
            while (e) {
                let k = this.vertexes.indexOf(e.adjver)
                ete = etv[i]
                lte = ltv[k] - e.weight
                if (ete === lte) {
                    console.log(`${this.vertexes[i].name} to ${e.adjver.name} value: ${e.weight}`)
                }

                e = e.next
            }
        }
    }
}


function main() {

    let v0 = new Vertex('v0')
    let v1 = new Vertex('v1')
    let v2 = new Vertex('v2')
    let v3 = new Vertex('v3')
    let v4 = new Vertex('v4')
    let v5 = new Vertex('v5')
    let v6 = new Vertex('v6')
    let v7 = new Vertex('v7')
    let v8 = new Vertex('v8')
    let v9 = new Vertex('v9')

    v0.setEdge(new Edge(v1, 3))
    v0.setEdge(new Edge(v2, 4))
    v1.setEdge(new Edge(v3, 5))
    v1.setEdge(new Edge(v4, 6))
    v2.setEdge(new Edge(v3, 8))
    v2.setEdge(new Edge(v5, 7))
    v3.setEdge(new Edge(v4, 3))
    v4.setEdge(new Edge(v6, 9))
    v4.setEdge(new Edge(v7, 4))
    v5.setEdge(new Edge(v7, 6))
    v6.setEdge(new Edge(v9, 2))
    v7.setEdge(new Edge(v8, 5))
    v8.setEdge(new Edge(v9, 3))


    let g = new Graph([v0, v1, v2, v3, v4, v5, v6, v7, v8, v9], 13)
    g.criticalPath()

}


main()