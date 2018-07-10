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
		return nil
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

func contain(items string, item string) bool {
	for i := 0; i < len(items); i++ {
		if item == string(items[i]) {
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
	op := "+-*/()"
	priority := make(map[string]int)
	priority["("] = 1
	priority["+"] = 2
	priority["-"] = 2
	priority["*"] = 3
	priority["/"] = 3

	list := New()
	for _, s := range text {
		s := string(s)
		if !contain(op, s) {
			fmt.Printf("%s", s)
		} else if list.top() == nil || s == "(" {
			list.push(s)
		} else if s == ")" {
			top := list.top()
			for top != "(" {
				fmt.Printf("%s", list.top().(string))
				top = list.pop()
			}
		} else if priority[list.top().(string)] >= priority[s] {
			fmt.Printf("%s", list.pop().(string))
			list.push(s)
		} else {
			list.push(s)
		}
	}

}

func printAll() {
	fmt.Println("----中缀表达式转后缀表达式----")
	text := "(3 - 5) * (6 + 17 * 4) / 3"
	match(text)
}

func main() {
	printAll()
}
