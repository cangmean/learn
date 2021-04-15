/**
 * 原理: 图的邻接矩阵
 */


// 图的邻接矩阵
class GraphMatrix {

    // 顶点数量
    constructor(number, fillNumber = 0) {
        this.number = number
        this.fillNumber = fillNumber
        this.matrix = this.makeMatrix()
        this.ordered = true
    }

    // 添加边，也就是顶点之间的联系
    addEdge(start, end, weight = 1) {
        this.matrix[start][end] = weight

        // 无序的情况，让矩阵对称
        if (!this.ordered) {
            this.matrix[end][start] = weight
        }
    }

    changeOrder(ordered) {
        this.ordered = ordered
    }

    makeMatrix() {
        let n = this.number
        let fillNumber = this.fillNumber
        return Array.from({
            length: n
        }, () => new Array(n).fill(fillNumber))
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////


//邻接表的顶点
class Vertex {

    // 顶点的名称和权重
    constructor(name, weight = 1) {
        this.name = name
        this.weight = weight
        this.links = new Map() // 管理的连接
    }

    addLink(vertex, weight = 1) {
        // 不存在vertex则添加
        let v = this.links[vertex.name]
        if (!v) {
            this.links[vertex.name] = weight
        }
    }

    toString() {
        return this.name
    }

}


class Edge {
    constructor(start, end, weight = 1) {
        this.start = start
        this.end = end
        this.weight = weight
    }

    // 运算符重载
    valueOf() {
        return this.weight
    }

}

// 图的邻接表
class Graph {

    constructor() {
        this.vertexList = new Map()
        this.edges = []
        this.number = 0
        this.ordered = true
    }

    // 设置有序无序
    changeOrder(ordered) {
        this.ordered = ordered
    }

    addVertex(name) {
        let vertex = new Vertex(name)
        this.vertexList[name] = vertex
        this.number += 1
        return vertex
    }

    getVertex(name) {
        return this.vertexList[name]
    }

    addEdge(startName, endName, weight = 1) {
        let start = this.vertexList[startName]
        let end = this.vertexList[endName]

        if (!start) {
            start = this.addVertex(startName)
        }

        if (!end) {
            end = this.addVertex(endName)
        }

        start.addLink(end, weight)

        if (!this.ordered) {
            end.addLink(start, weight)
        }

        let edge = new Edge(startName, endName, weight)
        this.edges.push(edge)
    }

}


module.exports = {
    Graph,
    GraphMatrix,
    Vertex,
    Edge,
}


function showMatrix() {
    let g = new GraphMatrix(5)
    g.addEdge(0, 1)
    g.addEdge(0, 2)
    g.addEdge(0, 3)
    g.addEdge(1, 2)
    g.addEdge(1, 4)
    console.log(g.matrix)
}


function show() {
    let g = new Graph()
    g.addEdge('v0', 'v1')
    g.addEdge('v0', 'v2')
    g.addEdge('v1', 'v2')
    g.addEdge('v1', 'v3')
    console.log(g.vertexList)
}

function main() {
    // showMatrix()
    show()
}