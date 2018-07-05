/*
	双端队列: 一个节点可以查到它的前驱和后继
*/

package main

import (
	"fmt"
)

// 节点
type Node struct {
	data int
	prev *Node
	next *Node
}

// 链表结构
type DoubleList struct {
	length int
	head   *Node
	tail   *Node
}

// 初始化
func New() *DoubleList {
	return &DoubleList{}
}

// 初始化节点
func initNode(e int) *Node {
	return &Node{data: e}
}

func (list *DoubleList) isEmpty() bool {
	return list.length == 0
}

func (list *DoubleList) getSize() int {
	return list.length
}

// 追加一个节点
func (list *DoubleList) push(e int) {
	node := initNode(e)
	tail := list.tail
	if tail != nil {
		tail.next = node
		node.prev = tail
		list.tail = node
	} else {
		list.head, list.tail = node, node
		node.prev, node.next = nil, nil
	}
	list.length++
}

// 删除尾节点
func (list *DoubleList) pop() interface{} {
	tail := list.tail
	if tail != nil {
		list.length--
		prev := tail.prev
		if prev != nil {
			prev.next = nil
			list.tail = prev
			tail.prev = nil
		} else {
			list.head, list.tail = nil, nil
		}
		return tail
	} else {
		return nil
	}
}

// 从头部追加一个节点
func (list *DoubleList) lpush(e int) {
	node := initNode(e)
	head := list.head
	if head != nil {
		list.head = node
		node.next = head
		node.prev = nil
		head.prev = node
	} else {
		list.head, list.tail = node, node
		node.prev, node.next = nil, nil
	}
	list.length++
}

// 从头部删除一个节点
func (list *DoubleList) lpop() interface{} {
	head := list.head
	if head != nil {
		list.length--
		next := head.next
		if next != nil {
			next.prev = nil
			list.head = next
			head.next = nil
		} else {
			list.head, list.tail = nil, nil
		}
		return head
	} else {
		return nil
	}
}

// 遍历所有节点
func (list *DoubleList) printAll() {
	idx := 0
	head := list.head
	for head != nil {
		idx++
		fmt.Printf("idx: %d, data: %d\n", idx, head.data)
		head = head.next
	}
}

func main() {
	fmt.Println("----双端链表----")
	list := New()
	list.push(1)
	list.push(2)
	list.lpush(5)
	list.pop()
	list.lpop()
	fmt.Println("链表长度:", list.getSize())
	fmt.Println("链表是否为空:", list.isEmpty())
	list.printAll()
}
