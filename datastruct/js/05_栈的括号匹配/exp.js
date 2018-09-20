/*
	表达式计算: 中缀表达式转后缀表达式
	原理: 从左遍历中缀表达式, 遇到操作数打印，遇到操作符， 判断栈顶操作符优先级是否大于等于当前操作符
	是 弹出栈顶， 当前操作符压入栈中
	否 压入栈顶
	遇到（  压入栈中， 如果 ）出现， 则循环弹出栈顶操作符直到与 ( 匹配。
	========
	计算后缀表达式：从左到右遍历后缀表达式，遇到操作数，放进栈，遇到操作符，栈顶两个数出栈，进行运算，运算结果放进栈，直到读完后缀表达式。
	这里还需要处理表达式中双位数， 比如: 17 。 因为遍历字符会把它当做1, 7。
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

const priority = {
  '(': 1,
  '+': 2,
  '-': 2,
  '*': 3,
  '/': 3
}

function match(text) {
  let op = '+-*/()'
  let stack = new Stack()

  //循环字符串
  for (let i = 0; i < text.length; i++) {
    let s = text[i]

    if (!op.includes(s)) {
      // 操作数， 打印出来
      console.log(s)
    } else if (stack.top() === null || s === '(') {
      // 操作符， 入栈
      stack.push(s)
    } else if (s === ')') {
      let top = stack.top()
      // 一直循环到开阔号
      while (top != '(') {
        console.log(top)
        top = stack.pop()
      }
    } else if (priority[stack.top()] >= priority[s]) {
      // 如果栈顶元素优先级大于当前操作符， 栈顶元素出栈， 操作符入栈
      console.log(stack.pop())
      stack.push(s)
    } else {
      stack.push(s)
    }
  }
}

;(function main() {
  let text = '(3 - 5) * (6 + 17 * 4) / 3'
  match(text)
})()
