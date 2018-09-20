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

function fact(n) {
  if (n > 0) {
    return n * fact(n - 1)
  } else {
    return 1
  }
}

;(function main() {
  let num = fact(5)
  console.log(num)
})()
