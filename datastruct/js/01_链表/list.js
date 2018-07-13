/*
    链表
*/

class Node {
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}

class List {
  constructor() {
    // 初始化
    this.head = null
    this.length = 0
  }

  isEmpty() {
    return this.length == 0
  }

  getSize() {
    return this.length
  }

  append(e) {
    /*
      从head开始以为循环到尾部, 追加新的节点
      如果创建pop函数也是一样
    */
    if (this.head === null) {
      this.head = new Node(e)
      this.length += 1
    } else {
      let head = this.head
      while (head.next !== null) {
        head = head.next
      }
      head.next = new Node(e)
      this.length += 1
    }
  }

  reverse() {
    /*
      反转链表
      移动head指针，指向下个节点， 并把原来节点指向上一个节点
    */
    let p = null
    let head = this.head
    while (head !== null) {
      // 把head赋值给q, 这里q和head都指向同一个Node
      let q = head
      // 然后head指向给了下一个节点
      head = q.next
      // q指向上一个节点
      q.next = p
      // 把当前节点指向为上一个节点
      p = q
    }
    this.head = p
  }

  print() {
    let idx = 0
    let head = this.head
    while (head !== null) {
      idx += 1
      console.log(`idx ${idx}, data: ${head.data}`)
      head = head.next
    }
  }
}

;(function main() {
  let list = new List()
  list.append(3)
  list.append(5)
  list.append(1)
  list.print()
  list.reverse()
  list.print()
})()
