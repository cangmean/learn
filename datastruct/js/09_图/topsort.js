/**
 * 拓扑排序是一个有向无环图（DAG）所有顶点的线性排列
 * 
 * 实现流程:
 * 1. 图中选择一个没有前驱的顶点(入度为0)然后删除
 * 2. 删除该顶点和以他为起点的有向边
 * 3. 重复上述两个过程，重复全部顶点。
 * 参考: https://leetcode-cn.com/problems/course-schedule/solution/course-schedule-tuo-bu-pai-xu-bfsdfsliang-chong-fa/
 * https://www.kancloud.cn/fortheday/js-data-structure-and-algorithm/1710974
 */


function topsort_bfs(adj) {
    let num = Object.keys(adj).length
    let indegrees = {}
    let que = []

    // 初始化度数
    for (let i = 1; i <= num; i++) {
        indegrees[i] = 0
        for (let j = 1; j <= num; j++) {
            let vertexs = adj[j]
            if (i !== j && vertexs.includes(i)) {
                indegrees[i] += 1
            }
        }

        if (indegrees[i] === 0) {
            que.push(i)
        }
    }

    // BFS 广度优先
    while (que.length > 0) {
        // 删除入度为0的顶点
        let v = que.shift()
        console.log('find:', v)

        // 删除他邻接边
        for (let i = 0; i < adj[v].length; i++) {

            // 邻接顶点的入度减 1
            let ver = adj[v][i]
            indegrees[ver] -= 1

            // 当邻接顶点入度为0时添加到队列中
            if (indegrees[ver] === 0) {
                que.push(ver)
            }
        }
    }

}

function topsort_dfs(adj) {
    let num = Object.keys(adj).length
    let visited = {} // 访问记录 0：未访问 1：在当前节点访问, 再次访问说明存在环返回false -1: 已被其他节点访问
    let que = []

    for (let i = 1; i < num; i++) {
        visited[i] = 0
    }
    console.log(visited)

    let dfs = function(i) {

        if (visited[i] === 1) {
            return false
        } else if (visited[i] === -1) {
            return true
        }

        // 标记访问
        visited[i] = 1
        console.log(i, 'find adjacent: ', adj[i])

        // 深度遍历
        for (let j = 0; j < adj[i].length; j++) {
            let ver = adj[i][j]
            if (!dfs(ver)) {
                return false
            }
        }
        visited[i] = -1
        que.push(i)
        return true
    }

    // 开始遍历
    for (let i = 1; i <= num; i++) {
        if (!dfs(i)) {
            break
        }
    }

    while (que.length > 0) {
        let v = que.pop()
        console.log('find:', v)
    }

}


function main() {
    // 邻接表
    let adj = {
        1: [2, 4],
        2: [3, 4],
        3: [5],
        4: [3, 5],
        5: [],
    }


    topsort_dfs(adj)

}

main()