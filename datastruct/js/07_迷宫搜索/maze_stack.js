class Stack {
  constructor() {
    this.list = []
  }

  getSize() {
    return this.list.length
  }

  isEmpty() {
    return this.getSize() === 0
  }

  push(e) {
    this.list.push(e)
  }

  pop() {
    return this.list.pop()
  }

  top() {
    if (this.getSize() === 0) {
      return null
    }
    return this.list[this.getSize() - 1]
  }
}

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
      [1, 0], // 向南
      [-1, 0] // 向北
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
    let st = new Stack()

    if (this.isEqual(start, end)) {
      console.log(`找到出口: ${start}`)
      return
    }
    // 标记已走过得路
    this.mark(start)
    // 入口和方向为0的序列入栈， 0， 1， 2， 3 表示 东，西，南，北
    st.push([start, 0])
    while (st.top()) {
      // 获取栈顶坐标已经探索方向
      let [pos, nxt] = st.pop()
      for (let i = nxt; i < 4; i++) {
        // 探索的位置
        let next_pos = [pos[0] + this.dirs[i][0], pos[1] + this.dirs[i][1]]
        if (this.isEqual(next_pos, end)) {
          console.log(`找到出口: ${next_pos}`)
          return
        }
        if (this.passable(next_pos)) {
          // 深度探索
          // 把当前节点的，下一个探索方向压入栈中, 保存当前节点探索信息(探索到几个)
          console.log(`移动位置: ${next_pos}`)
          st.push([pos, i + 1])
          // 标记探索节点
          this.mark(next_pos)
          // 把探索节点和方向压入栈中
          st.push([next_pos, 0])
          // 通过break 来打断当前位置其他方向上的探索， 从而深度探索
          break
        }
      }
    }
    console.log('未找到入口')
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
