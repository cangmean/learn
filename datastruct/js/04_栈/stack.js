/*
	栈是一种后进先出的队列(LIFO)， 是一种存储数据的容器.
*/

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
;(function main() {
  let list = new Stack()
  list.push(3)
  list.push(5)
  list.push(1)
  console.log(`栈顶元素为: ${list.top()}`)
  list.pop()
  console.log(`栈顶元素为: ${list.top()}`)
})()
