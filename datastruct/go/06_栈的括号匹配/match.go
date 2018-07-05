/*
	栈的括号匹配
	原理：通过栈的后进先出， 来实现括号匹配， 如果遇到开号则压入栈中， 遇到闭号弹出栈顶元素匹配， 匹配成功则打印， 失败则报错
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

func contain(items []string, item string) bool {
	for _, v := range items {
		if v == item {
			return true
		}
	}
	return false
}

func keys(obj map[string]string) []string {
	var keys []string
	for key, _ := range obj {
		keys = append(keys, key)
	}
	return keys
}

func match(text string) {
	open_handle := []string{"(", "{", "["}
	handle_pair := make(map[string]string)
	handle_pair[")"] = "("
	handle_pair["}"] = "{"
	handle_pair["]"] = "["
	
	list := New()
	for _, s := range text {
		s := string(s)
		if contain(open_handle, s) {
			list.push(s)
		} else if contain(keys(handle_pair), s) {
			if list.pop() != handle_pair[s] {
				fmt.Printf("不匹配 %s 和 %s\n", s, handle_pair[s])
			} else {
				fmt.Printf("匹配 %s 和 %s\n", s, handle_pair[s])
			}
		}
	}
}

func printAll() {
	fmt.Println("----栈的括号匹配----")
	text := "nihao (lklkl I'm sdfsd{ haha }f"
	match(text)
}

func main() {
	printAll()
}
