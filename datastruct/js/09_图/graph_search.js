/**
 * 图的遍历递归实现
 */

const _graph = require('./graph.js')


function DFS(graph, v) {
    let visited = {}

    // 初始化标记所有vertex 0: 未访问 1: 访问
    for (let key in graph.vertexList) {
        visited[key] = 0
    }

    // 按访问顺序放入队列中
    let search = function(vertex) {

        // 访问的队列
        let que = [vertex]
        visited[vertex.name] = 1

        for (let key in vertex.links) {
            let newVertex = graph.getVertex(key)
            if (visited[key] === 0) {
                que = que.concat(search(newVertex))
            }

        }

        return que
    }

    return search(v)

}


function main() {
    let g = new _graph.Graph()
    g.addEdge('v0', 'v1')
    g.addEdge('v0', 'v2')
    g.addEdge('v1', 'v3')
    g.addEdge('v2', 'v3')
    let dq = DFS(g, g.getVertex('v0'))

    console.log('dfs que: ', dq)
}

main()