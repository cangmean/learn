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

func fact(n int) int {
	res := 1
	list := New()
	for n > 0 {
		list.push(n)
		n--
	}

	for list.top() != nil {
		res = res * list.pop().(int)
	}
	return res
}

func main() {
	fmt.Println("----栈计算阶乘----")
	n := 5
	result := fact(5)
	fmt.Printf("fact[%d] = %d", n, result)
}
