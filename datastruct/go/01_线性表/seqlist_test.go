package seqlist

import (
	"fmt"
	"testing"
)

func TestIsEmpty(t *testing.T) {
	list := New(10)
	if ok := list.IsEmpty(); ok {
		t.Log("pass")
	} else {
		t.Error("falid")
	}
}

func TestIsFull(t *testing.T) {
	list := New(3)
	list.Append(3)

	if ok := list.IsFull(); ok {
		t.Log("pass")
	} else {
		t.Error("faild")
	}
}

func TestInsert(t *testing.T) {
	list := New(3)
	list.Append(1)
	list.Append(2)

	if err := list.Insert(1, 5); err == nil {
		t.Log("pass")
	} else {
		t.Error("falid")
	}
}

func TestDel(t *testing.T) {
	list := New(3)
	list.Append(1)
	list.Append(2)

	if err := list.Del(1); err == nil {
		t.Log("pass")
	} else {
		t.Error("falid")
	}
	for idx, num := range list.data {
		fmt.Printf("idx: %d, num: %d\n", idx, num)
	}
}

func TestGetElem(t *testing.T) {
	list := New(3)
	list.Append(1)
	list.Append(2)

	elm, err := list.GetElem(1)

	if err == nil && elm == 1 {
		t.Log("pass")
	} else {
		t.Error("falid")
	}
}
