/*
	线性表
*/
package seqlist

import (
	"errors"
)

type Elem int

type SeqList struct {
	maxSize int
	length  int
	data    []Elem
}

func New(maxSize int) *SeqList {
	return &SeqList{maxSize: maxSize, data: make([]Elem, maxSize)}
}

// 判断是否已空
func (list *SeqList) IsEmpty() bool {
	return list.length == 0
}

// 判断是否已满
func (list *SeqList) IsFull() bool {
	return list.length == list.maxSize
}

// 在数组下标i, 插入元素e
func (list *SeqList) Insert(i int, e Elem) error {
	if i < 0 || i >= list.length {
		return errors.New("Index out of range")
	}

	for k := list.length; k > i; k-- {
		list.data[k] = list.data[k-1]
	}
	list.data[i] = e
	list.length++
	return nil
}

// 删除数组下标元素
func (list *SeqList) Del(i int) error {
	if i < 0 || i >= list.length {
		return errors.New("Index out of range")
	}

	for k := i; k < list.length-1; k++ {
		list.data[k] = list.data[k+1]
	}
	list.data[list.length-1] = 0
	list.length--
	return nil
}

// 获取数组下标元素
func (list *SeqList) GetElem(i int) (interface{}, error) {
	if i < 0 || i >= list.length {
		return nil, errors.New("Index out of range")
	}
	return list.data[i], nil
}

// 追加元素
func (list *SeqList) Append(e Elem) {
	if list.IsFull() {
		panic("list is full")
	}
	list.data[list.length] = e
	list.length++
}
