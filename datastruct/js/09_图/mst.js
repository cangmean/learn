/**
 * 最小生成树
 * 参考: https://codingnote.cc/zh-hk/p/354670/  prim 描述
 */


const _graph = require('./graph.js')



class Kruskal {
    constructor(graph, vertexs) {
        this.graph = graph
        this.vertexs = vertexs
        this.vertexMap = {} // 顶点集合 {'v0": 'v0', 'v1': 'v1', ...} 键表示顶点坐标, 如果顶点之间连接, 值表示另外一个顶点 例如: 'v1': 'v2'

        this.init()
    }

    init() {
        for (let v of this.vertexs) {
            this.vertexMap[v] = v
        }
    }

    find(v) {
        let vertexMap = this.vertexMap
        console.log('find:', v, ' to:', vertexMap[v])
        if (vertexMap[v] !== v) {
            vertexMap[v] = this.find(vertexMap[v])
        }
        return vertexMap[v]
    }

    run() {
        let MST = []
        let n = this.vertexs.length - 1 // 所需边的数量
        let edges = this.graph.edges.sort(function(x, y) {
            return x - y
        })

        // 已排好序的边
        console.log(edges)

        while (edges.length > 0) {

            // 队列将最小权值的边弹出
            let edge = edges.shift()

            // 获取边的vertex
            let [start, end] = [edge.start, edge.end]

            // 检查顶点连接的顶点
            let v1 = this.find(start)
            let v2 = this.find(end)

            console.log(`edge vertex: ${start} to ${v1}`)
            console.log(`edge vertex: ${end} to ${v2}`)

            // 当两个顶点无交集时, 连接顶点
            if (v1 != v2) {
                this.vertexMap[v2] = v1
                MST.push(edge)
                console.log('add eage: ', edge)
                n -= 1
            }
            console.log('\n')

            // 当n=0时已获取所有边的数量
            if (n === 0) {
                break
            }

        }
        console.log('mst: ', MST)
    }

}


function Prim(graph, start) {
    // 邻接矩阵
    let matrix = graph.matrix

    let U = [] // 加入到最小生成树的顶点集合， 用来描述 lowcost中权值为0时表示顶点k已添加到集合

    let k = 0 // 最短邻接边
    let adjvex = [] // 邻接点
    let lowcost = [] // 邻接点的权值

    // 初始化
    for (let i = 0; i < graph.number; i++) {
        lowcost[i] = matrix[start][i]
        adjvex[i] = start
    }

    lowcost[start] = 0 // 起点放入集合U， 权值为0表示添加到集合

    // 初始的minWeight
    for (let i = 0; i < graph.number - 1; i++) {

        let minWeight = graph.fillNumber

        for (let j = 0; j < graph.number; j++) {
            // 获取最短边的邻接点k
            if (lowcost[j] !== 0 && lowcost[j] < minWeight) {
                minWeight = lowcost[j]
                k = j
            }
        }

        // 将k点加入到集合
        lowcost[k] = 0

        console.log('find k: ', k)

        //打印顶点名称和权值
        console.log(`find: v${adjvex[k]} to v${k} weight: ${minWeight}`)

        // console.log('before adjvex:', adjvex)
        // console.log('before lowcost: ', lowcost)

        // 调整lowcost 和 adjvex
        for (let j = 0; j < graph.number; j++) {

            if (lowcost[j] !== 0 && matrix[k][j] < lowcost[j]) {
                lowcost[j] = matrix[k][j]
                adjvex[j] = k
            }
        }

        // console.log('after adjvex:', adjvex)
        // console.log('after lowcost: ', lowcost)

    }

}



function main() {
    let g = new _graph.Graph()
    let vertexs = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5']
    g.addEdge('v0', 'v1', 10)
    g.addEdge('v0', 'v4', 19)
    g.addEdge('v0', 'v5', 21)
    g.addEdge('v1', 'v2', 5)
    g.addEdge('v1', 'v3', 6)
    g.addEdge('v1', 'v5', 11)
    g.addEdge('v2', 'v3', 6)
    g.addEdge('v3', 'v4', 18)
    g.addEdge('v3', 'v5', 14)
    g.addEdge('v4', 'v5', 7)
    let k = new Kruskal(g, vertexs)
    k.run()

    g = new _graph.GraphMatrix(6, 100)
    g.changeOrder(false)
    g.addEdge(0, 1, 10)
    g.addEdge(0, 4, 19)
    g.addEdge(0, 5, 21)
    g.addEdge(1, 2, 5)
    g.addEdge(1, 3, 6)
    g.addEdge(1, 5, 11)
    g.addEdge(2, 3, 6)
    g.addEdge(3, 4, 18)
    g.addEdge(3, 5, 14)
    g.addEdge(4, 5, 7)
    console.log(g)
    Prim(g, 1)

}

main()