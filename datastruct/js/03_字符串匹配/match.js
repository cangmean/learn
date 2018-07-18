/*
	字符串匹配: 朴素匹配算法
	原理: 朴素匹配算法是对目标字符串和模板字符串的一一匹配。如果匹配得上,下标向右移一位, 否则清空并重新开始匹配。
*/

const match = (target, pattern) => {
  let [i, j] = [0, 0]
  let [n, m] = [target.length, pattern.length]
  while (i < n && j < m) {
    if (target[i] == pattern[j]) {
      console.log(
        `匹配的元素: target[${i}]=${target[i]}, pattern[${j}]=${pattern[j]}`
      )
      i += 1
      j += 1
    } else {
      console.log(
        `不匹配的元素: target[${i}]=${target[i]}, pattern[${j}]=${pattern[j]}`
      )
      i = i - j + 1
      j = 0
    }
  }
  if (j == m) {
    return i - j
  }
  return -1
}
;(function main() {
  let target = 'abb abad abac'
  let pattern = 'abac'
  console.log('target', target)
  console.log('pattern', pattern)
  match(target, pattern)
})()
