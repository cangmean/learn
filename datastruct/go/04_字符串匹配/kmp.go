/*
	kmp匹配算法
	原理: kmp是通过已知匹配的字符进行移位的算法，位移数是通过已匹配的字符串的前缀和后缀元素集合中最长子元素长度。
	http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
*/

package main

import (
	"fmt"
)

// 获取交集
func intersection(A *[]string, B *[]string) []string {
	set := make(map[string]int)
	var list []string
	for _, elem := range *A {
		v := set[elem]
		if v == 0 {
			set[elem] = 1
		} else {
			set[elem] = v + 1
		}
	}
	for _, elem := range *B {
		v := set[elem]
		if v == 0 {
			set[elem] = 1
		} else {
			set[elem] = v + 1
		}
	}
	for k, v := range set {
		if v > 1 {
			list = append(list, k)
		}
	}
	return list
}

// 获取前缀
func getPrefix(pattern string) []string {
	var list []string
	for i := 0; i < len(pattern)-1; i++ {
		s := pattern[:i+1]
		list = append(list, s)
	}
	return list
}

// 获取后缀
func getSuffix(pattern string) []string {
	var list []string
	for i := 0; i < len(pattern)-1; i++ {
		s := pattern[i+1:]
		list = append(list, s)
	}
	return list
}

// 获取位移, 通过前缀和后缀子元素的交集获取最长子集长度
func patternNext(pattern string) int {
	prefix := getPrefix(pattern)
	suffix := getSuffix(pattern)
	set := intersection(&prefix, &suffix)
	offset := -1
	for i := 0; i < len(set); i++ {
		if offset < len(set[i]) {
			offset = len(set[i])
		}
	}
	return offset
}

func match(target string, pattern string) int {
	var i, j int
	n, m := len(target), len(pattern)

	for i < n && j < m {

		if target[i] == pattern[j] {
			fmt.Printf(
				"匹配元素: target[%d]=%c, pattern[%d]=%c\n",
				i, target[i], j, pattern[j],
			)
			i++
			j++
		} else {
			offset := j - patternNext(pattern[:j])
			fmt.Printf(
				"不匹配元素: target[%d]=%c, pattern[%d]=%c",
				i, target[i], j, pattern[j],
			)
			fmt.Printf(
				"\t位移数: %d\n", offset,
			)
			i = i + offset
			j = 0

		}
	}
	if j == m {
		return i - j
	}
	return -1
}

func main() {
	fmt.Println("----kmp匹配算法----")
	target := "BBC ABCDAB ABCDABCDABDE"
	pattern := "ABCDABD"
	fmt.Println("target:", target)
	fmt.Println("pattern:", pattern)
	match(target, pattern)
}
