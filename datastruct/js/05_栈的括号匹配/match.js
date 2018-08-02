/*
	栈的括号匹配
	原理：通过栈的后进先出， 来实现括号匹配， 如果遇到开号则压入栈中， 遇到闭号弹出栈顶元素匹配， 匹配成功则打印， 失败则报错
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

const match = text => {
  let open_handle = ['(', '{', '[']
  let handle_pair = {
    ')': '(',
    '}': '{',
    ']': '['
  }
  let list = new Stack()
  for (let i = 0; i < text.length; i++) {
    let s = text[i]
    if (open_handle.indexOf(s) > -1) {
      list.push(s)
    } else if (Object.keys(handle_pair).indexOf(s) > -1) {
      if (list.pop() != handle_pair[s]) {
        console.log(`${s} 和 ${handle_pair[s]} 不匹配`)
      } else {
        console.log(`${s} 和 ${handle_pair[s]} 匹配`)
      }
    }
  }
}
;(function main() {
  let text = "nihao (lklkl I'm sdfsd{ haha })f"
  match(text)
})()
