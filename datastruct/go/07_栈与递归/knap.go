/*
	简单背包递归算法

	问题: 有n个物品，重量分别为 W(i), 现有一包裹负重W， 是否能从n个物品中去若干个物品刚好满足背包负重。
	原理： 通过递归求解, 像数学归纳法。
	当不选W(n) 的时候 knap(w, n-1) 是 knap(w, n)的解，
	当选W(n) 的时候 knap(w - W(n), n-1) 是 knap(w, n)的解。
	这就有了递归的性质，判断两种情况。
*/

package main

import (
	"fmt"
)

var list = []int{5, 3, 2, 10, 7, 9}

// w 报的总重量, n个物品
func knap(w int, n int) bool {

	if w == 0 {
		return true
	} else if w > 0 && n < 1 {
		return false
	} else if knap(w, n-1) {
		return true
	} else if knap(w-list[n-1], n-1) {
		fmt.Printf("item: 第%d个包裹, 重量为: %d\n", n, list[n-1])
		return true
	} else {
		return false
	}
}

func main() {
	fmt.Println("----简单背包算法----")
	res := knap(25, 6)
	fmt.Println(res)
}
