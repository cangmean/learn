/*
	栈是一种后进先出的队列(LIFO)， 是一种存储数据的容器.
*/
package main

import (
	"fmt"
)

type Stack struct {
	data []interface{}
}

func New() *Stack {
	return &Stack{}
}

func (list *Stack) getSize() int {
	return len(list.data)
}

func (list *Stack) isEmpty() bool {
	return list.getSize() == 0
}

func (list *Stack) push(e interface{}) {
	list.data = append(list.data, e)
}

func (list *Stack) pop() interface{} {
	if list.getSize() == 0 {
		panic("空栈不能弹出元素")
	}
	idx := list.getSize() - 1
	top := list.data[idx]
	list.data = list.data[:idx]
	return top
}

// 如果是空栈返回nil
func (list *Stack) top() interface{} {
	if list.getSize() == 0 {
		return nil
	}
	idx := list.getSize() - 1
	top := list.data[idx]
	return top
}

func printAll() {
	fmt.Println("----栈----")
	list := New()
	list.push(1)
	list.push(2)
	list.push(3)
	fmt.Println("栈顶元素:", list.top())
	fmt.Println("栈的长度:", list.getSize())
	last := list.pop()
	fmt.Println("删除的栈顶元素:", last)
	fmt.Println("现有的栈顶元素:", list.top())
	fmt.Println("栈的长度:", list.getSize())
}

func main() {
	printAll()
}
