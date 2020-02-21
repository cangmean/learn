// 两数相加

var addTwoNumbers = function (l1, l2) {
    let c = 0; // 超过10
    let lst = new ListNode() // 新的链表
    let l = lst
    while (l1 || l2 || c) {
        let val1 = l1 ? l1.val : 0
        let val2 = l2 ? l2.val : 0

        // 相加
        let n = val1 + val2 + c
        if (n > 9) {
            let i = new ListNode(n % 10)
            l.next = i
            c = 1
        } else {
            let i = new ListNode(n)
            l.next = i
            c = 0
        }

        if (l1) {
            l1 = l1.next
        }
        if (l2) {
            l2 = l2.next
        }

        l = l.next
    }
    return lst.next
}