/*
	简单链表
*/
package main

import (
	"fmt"
)

// 节点结构
type Node struct {
	data int
	next *Node
}

// 链表结构
type List struct {
	length int
	head *Node
}

// 初始化
func New() *List {
	return &List{}
}

// 判断是否为空
func (list *List) isEmpty() bool {
	return list.head == nil
}

// 追加
func (list *List) append(e int) {
	if list.head == nil {
		list.head = &Node{data: e}
		list.length++
		return
	}
	head := list.head
	for head.next != nil {
		head = head.next
	}
	head.next = &Node{data: e}
	list.length++
}

// 获取链表长度
func (list *List) getSize() int {
	return list.length
}

// 反转链表
func (list *List) reverse() {
	var p *Node
	head := list.head
	for head != nil {
		q := head
		head = q.next
		q.next = p
		p = q
	}
	list.head = p
}

// 遍历所有节点
func (list *List) printAll() {
	idx := 0
	head := list.head
	for head != nil {
		idx++
		fmt.Printf("idx: %d, data: %d\n", idx, head.data)
		head = head.next
	}
}

func main() {
	fmt.Println("----简单链表----")
	list := New()
	list.append(3)
	list.append(5)
	fmt.Println("链表长度:", list.getSize())
	fmt.Println("链表是否为空:", list.isEmpty())
	list.printAll()
	list.reverse()
	list.printAll()
}
