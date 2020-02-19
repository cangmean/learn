

/**
 *  f(n) = f(n - 1) + f(n - 2)
 */
function jump(n) {
    // 简单递归法
    if (n === 1) {
        return 1
    }

    if (n === 2) {
        return 2
    }

    return jump(n - 1) + jump(n - 2)
}


function jump2(n) {
    // 动态规划
    let a = 1
    let b = 2

    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b]
    }
    return b
}


let x = jump2(10)
console.log(x)