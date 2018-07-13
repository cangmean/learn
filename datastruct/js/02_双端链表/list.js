/*
  双端链表: 一个节点可以查到它的前驱和后继
*/

class Node {
  constructor(data, prev = null, next = null) {
    this.data = data
    this.prev = prev
    this.next = next
  }
}

class List {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  isEmpty() {
    return this.length == 0
  }

  getSize() {
    return this.length
  }

  push(e) {
    /**
     *
     * 通过判断尾节点， 如果为空， head和tail指向一个新的节点
     * 如果不为空, 当前tail指向一个新的节点， 新的节点的prev指向当前节点, tail向后移位
     *
     */
    let node = new Node(e)
    let tail = this.tail
    if (tail !== null) {
      tail.next = node
      node.prev = tail
      this.tail = node
    } else {
      this.head = this.tail = node
    }
    this.length += 1
  }

  pop() {
    /**
     * 通过判断尾节点， 如果不为空， 并且有上一个节点， 那么当前tail节点的指向为空， 并把上一个节点设置为新的tail节点
     */
    let tail = this.tail
    if (tail !== null) {
      this.length -= 1
      let prev = tail.prev
      if (prev !== null) {
        prev.next = null
        tail.prev = null
        this.tail = prev
      } else {
        this.head = this.tail = null
      }
      return tail
    }

    return null
  }

  lpush(e) {
    let node = new Node(e)
    let head = this.head
    if (head !== null) {
      head.prev = node
      node.next = head
      this.head = node
    } else {
      this.head = this.tail = node
    }
    this.length += 1
  }

  lpop() {
    let head = this.head
    if (head !== null) {
      this.length -= 1
      let next = head.next
      if (next !== null) {
        head.next = null
        next.prev = null
        this.head = next
      } else {
        this.head = this.tail = null
      }
      return head
    }
    return null
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
  list.push(3)
  list.push(5)
  list.lpush(1)
  list.print()
  list.pop()
  list.print()
})()
