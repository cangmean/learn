/**
 * 多点最短路径算法 dis(i, j) = dis(i, k) + dis(k, j) 其中k 是i到j的中转点。 可以是多此中转
 * 
 * 设dis(i, j) 为i到j的最短路径, 对于每个k点 dis(i, j) > dis(i, k) + dis(k, j) 那么就设置 dis(i, j) = dis(i, k) + dis(k, j)。
 * 当遍历完k点后dis(i, j)就是i到j的最短路径
 * 
 * 参考: https://www.cnblogs.com/wangyuliang/p/9216365.html
 *  https://houbb.github.io/2020/01/23/data-struct-learn-03-graph-floyd
 */


function floyd(matrix) {
    let n = matrix.length
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // 替换
                if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
                    matrix[i][j] = matrix[i][k] + matrix[k][j]
                }

            }
        }
    }

    console.log(matrix)
}


function main() {
    let matrix = [
        [0, 4, Infinity, 2, Infinity],
        [4, 0, 4, 1, Infinity],
        [Infinity, 4, 0, 1, 3],
        [2, 1, 1, 0, 7],
        [Infinity, Infinity, 3, 7, 0]
    ]
    console.log(matrix)
    floyd(matrix)
}

main()