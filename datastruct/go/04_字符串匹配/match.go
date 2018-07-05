/*
	字符串匹配: 朴素匹配算法
	原理: 朴素匹配算法是对目标字符串和模板字符串的一一匹配。如果匹配得上,下标向右移一位, 否则清空并重新开始匹配。
*/

package main

import (
	"fmt"
)

// 匹配
func match(target string, pattern string) int {
	var i, j int
	n, m := len(target), len(pattern)
	for i < n && j < m {
		if target[i] == pattern[j] {
			i++
			j++
		} else {
			fmt.Printf(
				"不匹配元素: target[%d]=%c, pattern[%d]=%c\n",
				i, target[i], j, pattern[j],
			)
			i = i - j + 1
			j = 0
		}
	}
	if j == m {
		return i - j
	}
	return -1
}

func main() {
	fmt.Println("----朴素匹配算法----")
	target := "abb abac"
	pattern := "abac"
	fmt.Println("target:", target)
	fmt.Println("pattern:", pattern)

	match(target, pattern)
}
