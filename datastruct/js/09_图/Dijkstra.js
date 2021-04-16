/**
 * 单源点最短路径算法
 * 参考: https://houbb.github.io/2020/01/23/data-struct-learn-03-graph-dijkstra
 */


function Dijkstra(matrix, start) {
    let number = matrix.length
    let s = new Array(number).fill(0) // 集合u表示是加入的顶点集合
    let distance = new Array(number).fill(Infinity)

    console.log(matrix)

    let vertexs = ['A', 'B', 'C', 'D', 'E']

    // ['A', 'B', 'C', 'D', 'E']
    // 下标为到达的顶点, 比如 distance[3] 中下标表示 从start开始到D， 而值表示路径的权值。
    distance[start] = 0
    s[start] = 1 // 加入到集合

    console.log(distance, s, '\n')


    for (let i = 0; i < number; i++) {
        // 到达的顶点

        console.log('开始顶点: ', vertexs[i], ' index: ', i)
        let k = 0
        let minWeight = Infinity
        for (let j = 0; j < number; j++) {
            // 未加入到集合
            if (s[j] === 0 && (distance[j] < minWeight)) {
                k = j
                minWeight = distance[j]
            }
        }

        s[k] = 1
        console.log('放入已知集合: ', vertexs[k], s)

        for (let j = 0; j < number; j++) {
            if (s[j] === 0 && distance[k] + matrix[k][j] < distance[j]) {
                distance[j] = distance[k] + matrix[k][j]
                console.log(`${vertexs[k]} to ${vertexs[j]} ---> ${distance[j]}`)
            }
        }
        console.log('distance: ', distance)
        console.log('\n')
    }

}

function main() {
    let matrix = [
        [0, 4, Infinity, 2, Infinity],
        [4, 0, 4, 1, Infinity],
        [Infinity, 4, 0, 1, 3],
        [2, 1, 1, 0, 7],
        [Infinity, Infinity, 3, 7, 0]
    ]
    Dijkstra(matrix, 0)
}

main()