/*()
	简单背包递归算法

	问题: 有n个物品，重量分别为 W(i), 现有一包裹负重W， 是否能从n个物品中去若干个物品刚好满足背包负重。
	原理: 通过递归求解, 像数学归纳法。
	当不选W(n) 的时候 knap(w, n-1) 是 knap(w, n)的解，
	当选W(n) 的时候 knap(w - W(n), n-1) 是 knap(w, n)的解。
	这就有了递归的性质，判断两种情况。
*/

// 包裹每个物品的重量
const list = [5, 10, 3, 7]

/**
 *
 * @param {Int} w 背包的总重量
 * @param {Int} n 每个物品
 */
function knap(w, n) {
  if (w == 0) {
    return true
  } else if (w > 0 && n < 1) {
    return false
  } else if (knap(w, n - 1)) {
    return true
  } else if (knap(w - list[n - 1], n - 1)) {
    console.log(`item： 第${n}个包裹，重量为：${list[n - 1]}`)
    return true
  } else {
    return false
  }
}

;(function main() {
  knap(15, 4)
})()
