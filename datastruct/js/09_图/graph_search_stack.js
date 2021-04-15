/**
 * 图的遍历  非递归实现
 */

const _graph = require('./graph.js')


// 图的深度优先遍历 
function DFS(graph, v) {

    let visited = {}

    // 初始化标记所有vertex 0: 未访问 1: 访问
    for (let key in graph.vertexList) {
        visited[key] = 0
    }

    // 通过访问顺序把vertex放入队列中
    let dfsQue = [v]
        // 将第一个访问的vertex 状态改为已访问
    visited[v.name] = 1

    // 创建一个临时的栈
    let stack = []
    stack.push([0, Object.keys(v.links)])

    while (stack.length > 0) {
        let [idx, links] = stack.pop()

        // 防止 访问空的邻接vertex
        if (idx < links.length) {
            // 访问的第一个邻接vertex
            let vertexName = links[idx]
            let vertex = graph.getVertex(vertexName)


            // 下一次访问的vertex 压入栈中
            stack.push([idx + 1, links])
                // 如果未访问过
            if (visited[vertexName] === 0) {
                dfsQue.push(vertex)
                visited[vertexName] = 1

                // 深度优先, 优先访问临界点
                stack.push([0, Object.keys(vertex.links)])
            }

        }
    }

    return dfsQue

}

// 图的广度优先遍历
function BFS(graph, v) {

    let visited = {}

    // 初始化标记所有vertex 0: 未访问 1: 访问
    for (let key in graph.vertexList) {
        visited[key] = 0
    }

    let bfsQue = [v]
    visited[v.name] = 1

    // 创建一个临时队列
    let que = []
    que = que.concat(Object.keys(v.links))

    while (que.length > 0) {
        let vertexName = que[0]
        let vertex = graph.getVertex(vertexName)
        que.shift()
        if (visited[vertexName] === 0) {
            bfsQue.push(vertex)
            visited[vertexName] = 1
            que = que.concat(Object.keys(vertex.links))
        }
    }

    return bfsQue

}


function main() {
    let g = new _graph.Graph()
    g.addEdge('v0', 'v1')
    g.addEdge('v0', 'v2')
    g.addEdge('v1', 'v3')
    g.addEdge('v2', 'v3')
    let dq = DFS(g, g.getVertex('v0'))

    console.log('dfs que: ', dq)

    let bq = BFS(g, g.getVertex('v0'))
    console.log('bfs que: ', bq)

}

main()