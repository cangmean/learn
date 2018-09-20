/*
	迷宫搜索
	原理: 利用递归来检测当前postion是否是迷宫的出口, 如果是完成 否继续查找。
	查找中可以向4个方向走, dirs 分别是东南西北 顺时针方向。
	mark 用来标记已走过的路， 如果当前位置已走过就不在查找
	passable 来检测postion是否可通行
*/

class MazeQuest {
  /**
   * @param {Array} maze 迷宫地图
   * @param {Position} start 开始
   * @param {Position} end 结束
   */
  constructor(maze, start, end) {
    this.maze = maze
    this.start = start
    this.end = end
    this.dirs = [
      [0, 1], // 向东
      [0, -1], // 向西
      [-1, 0], // 向北
      [1, 0] // 向南
    ]
    this.run(start, end)
  }

  /**
   * 标记
   * @param {Position} pos 标记坐标 0: 可通行， 1: 不可通行，2: 已通行
   */
  mark(pos) {
    this.maze[pos[0]][pos[1]] = 2
  }

  // 判断是否相同
  isEqual(pos1, pos2) {
    if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
      return true
    } else {
      return false
    }
  }

  // 判断能否通行
  passable(pos) {
    if (pos[0] < 0 || pos[1] < 0) {
      return false
    } else if (
      this.maze.length <= pos[0] ||
      this.maze[pos[0]].length <= pos[1]
    ) {
      return false
    }
    return this.maze[pos[0]][pos[1]] == 0
  }

  // 开始探索
  run(start, end) {
    this.mark(start)
    if (this.isEqual(start, end)) {
      console.log(`找到出口: ${start}`)
      return true
    }

    // 循环探索四个方向
    this.dirs.forEach(item => {
      let pos = [start[0] + item[0], start[1] + item[1]]
      // 判断通行
      if (this.passable(pos)) {
        console.log(`移动位置: ${pos}`)
        if (this.run(pos, end)) {
          return true
        }
      }
    })
    return false
  }
}

;(function main() {
  let maze = [
    [0, 0, 0, 1, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1],
    [1, 1, 0, 0, 0]
  ]
  console.log('迷宫地图:')
  console.log(maze)
  new MazeQuest(maze, [0, 0], [4, 4])
})()
