
/**  详解地址: https://blog.csdn.net/program_developer/article/details/82846180
 * f(n, w) = 0          (当 n <= 1, w < p[0])
 * f(n, w) = g[0]       (当 n == 1, w > p[0])
 * f(n, w) = f(n-1, w)  (当 n > 1, w < p[n-1])
 * f(n, w) = max(
 *      fn(n - 1, w), f(n - 1, w - p[n-1]) + g[n-1]
 * )                                               （当 n > 1, w >= p[n - 1]）
 * 
 * @param {int} n  金矿数
 * @param {int} w  工人数
 * @param {Array} g 金矿的产量数, 数组
 * @param {Array} p 金矿需要的工人数, 数组
 * 
 */
function getMostGold(n, w, g, p) {
    // 简单递归

    // 当矿小于等于 1 且人数不足时, 挖到的金矿为0
    if (n <= 1 && w < p[0]) {
        return 0
    }
    // 当只能挖第一个时
    if (n === 1 && w >= p[0]) {
        return g[0]
    }

    // 当人数不够挖当前矿时, 之前的矿为可挖的最大值
    if (n > 1 && w < p[n - 1]) {
        return getMostGold(n - 1, w, g, p)
    }

    // 当人数足够时
    if (n > 1 && w >= p[n - 1]) {
        return Math.max(
            getMostGold(n - 1, w, g, p),
            getMostGold(n - 1, w - p[n - 1], g, p) + g[n - 1]
        )
    }

}


function getMostGold2(n, w, g, p) {
    // 动态规划方法

    let preResult = [] // 前一个挖矿数据, 每个元素都是匹配不同人数时的金矿数
    let result = [] // 当前挖矿的数据

    // 第一个矿的数据, 设置边界格子的值
    for (let i = 0; i < w; i++) {
        if (i < p[0]) {
            preResult[i] = 0
        } else {
            preResult[i] = g[0]
        }
    }

    // 填充其余格子的值, 从上一行推出下一行, 外层的是金矿数, 内层的是工人数
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < w; j++) {

            // p[i] 是 第 i - 1 矿需要的工人数
            if (j < p[i]) {
                result[j] = preResult[j]
            } else {
                // preResult[j] 表示当不挖当前矿时的数量
                // preResult[j - p[i - 1]] + g[i]。 表示挖当前矿时数量 + 其余人数挖之前矿时的数量
                result[j] = Math.max(preResult[j], preResult[j - p[i - 1]] + g[i])
            }

        }

        // 用当前金矿的数量边界, 覆盖之前的
        for (let j = 0; j < w; j++) {
            preResult[j] = result[j]
        }
    }
    return result[w]

}



let gold = [400, 500, 200, 300, 350]
let person = [5, 5, 3, 4, 3]

let x = getMostGold2(5, 10, gold, person)

console.log(x)