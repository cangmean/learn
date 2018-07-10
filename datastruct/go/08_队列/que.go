/*
	队列是一种先进先出的队列(FIFO)， 是一种存储数据的容器.
*/

package main

import (
	"fmt"
)

type Queue struct {
	data []interface{}
}

func New() *Queue {
	return &Queue{}
}

func (list *Queue) getSize() int {
	return len(list.data)
}

func (list *Queue) isEmpty() bool {
	return list.getSize() == 0
}

func (list *Queue) first() interface{} {
	if list.getSize() == 0 {
		return nil
	}

	return list.data[0]
}

func (list *Queue) enqueue(e interface{}) {
	list.data = append(list.data, e)
}

func (list *Queue) dequeue() interface{} {
	if list.getSize() == 0 {
		return nil
	}
	first := list.data[0]
	list.data = list.data[1:]
	return first
}

func main() {
	fmt.Println("----队列----")
	list := New()
	list.enqueue(1)
	list.enqueue(2)
	list.enqueue(3)
	fmt.Println("队列: ", list.data)
	e := list.dequeue()
	fmt.Printf("%d 出队列， 现队列: %d\n", e, list.data)

}
