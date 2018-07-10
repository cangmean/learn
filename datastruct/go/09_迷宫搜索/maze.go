/*
	迷宫搜索
	原理: 利用递归来检测当前postion是否是迷宫的出口, 如果是完成 否继续查找。
	查找中可以向4个方向走, dirs 分别是东南西北 顺时针方向。
	mark 用来标记已走过的路， 如果当前位置已走过就不在查找
	passable 来检测postion是否可通行
*/

package main

import (
	"fmt"
)

// 方向
var dirs = [][]int{
	{0, 1},  // 向东
	{0, -1}, // 向西
	{-1, 0}, // 向北
	{1, 0},  // 向南
}

var direction = map[int]string{
	0: "可向东",
	1: "可向南",
	2: "可向西",
	3: "可向北",
}

// 标记到过的位置
func mark(maze [][]int, pos []int) {
	maze[pos[0]][pos[1]] = 2
}

// 检查是否可同行
func passable(maze [][]int, pos []int) bool {
	if pos[0] < 0 || pos[1] < 0 {
		return false
	} else if len(maze) <= pos[0] || len(maze[pos[0]]) <= pos[1] {
		return false
	}
	return maze[pos[0]][pos[1]] == 0
}

func quest(maze [][]int, start []int, end []int) bool {

	mark(maze, start)
	fmt.Println("\n========================\n当前位置:", start)
	fmt.Printf("当前地图: \n\t%d\n\t%d\n\t%d\n\t%d\n\t%d\n", maze[0], maze[1], maze[2], maze[3], maze[4])
	if start[0] == end[0] && start[1] == end[1] {
		fmt.Println("找到出口:", start)
		return true
	}
	// 0, 1, 2, 3 分别代表 东南西北
	for i := 0; i < 4; i++ {
		pos := []int{
			start[0] + dirs[i][0],
			start[1] + dirs[i][1],
		}
		if passable(maze, pos) {
			fmt.Println("移动位置:", pos)
			if quest(maze, pos, end) {
				return true
			}
		}
	}
	return false
}

func main() {
	fmt.Println("----迷宫搜索----")

	fmt.Println(`
[0, 0, 0, 1, 1]
[0, 1, 0, 0, 1]
[0, 0, 1, 0, 0]
[1, 0, 0, 1, 1]
[1, 1, 0, 0, 0]
		`)
	maze := [][]int{
		{0, 0, 0, 1, 1},
		{0, 1, 0, 0, 1},
		{0, 0, 1, 0, 0},
		{1, 0, 0, 1, 1},
		{1, 1, 0, 0, 0},
	}
	ok := quest(maze, []int{0, 0}, []int{4, 4})
	fmt.Println(ok)
}
