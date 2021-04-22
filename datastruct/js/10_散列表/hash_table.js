/**
 * 散列表(哈希表)
 */


class HashTable {
    constructor(number = 1000) {
        this.count = 0 // 保存的k的值
        this.arr = new Array(number)
        this.hash = this.h1
        this.clash = this.c1
    }


    // 散列函数 直接定址法: 通过对k本身或线性函数作为哈希地址。 即: h(k) = k 或 h(k) = a x k + b  其中 a, b均为常出
    h1(k) {
        let a = 3
        let b = 5
        return a * k + b
    }

    // 散列函数 除余法: 通过K 除以不大于散列表长度m的整数p得到的余数。即: h(k) = k % p  (p < m) m为散列表长度
    h2(k) {
        let p = this.arr - 1
        return k % p
    }

    // 散列函数 基数转换法: 取一个正整数r作为k的基数, 将其转换成其他进制, 通常r去一个素数. 即: r = 7, k = 1256. h(k)= 1 * (7^3) + 2 * (7^2) + 5 * 7 + 6 = 482
    h3(k) {
        let r = 7
        let k_str = k.toString()
        let len = k_str.length
        let res = 0
        let n = len
        while (n > 0) {
            res += parseInt(k_str[len - n]) * Math.pow(r, n - 1)
            n -= 1
        }

        return res
    }

    // 冲突 开地址法: 当添加一个数据的时候发生冲突，那么重新选一个位置存储。即: d 为地址中的增量序列，H(k) = (h(k) + d) % p (p < m)散列表长度
    // 利用开地址法存储的时候， 需要把原先的k值也保存到arr里面，查找是追述 即: arr[k] = [k, v] 这里面k时用来记录原先的地址
    // 25 % 10 和 15 % 10、5 % 10 的余数都是 5， 那么 k=5的时候会从k=25开始追述，arr[25] = [25, v] 这时候比较k和25不一致, 那么继续追述, 直到k值为5时停止查找
    c1(k) {
        let d = 1
        let p = this.arr - 1
        let index = (this.hash(k) + d) % p

        // 如果新的地址还是有冲突，那么继续查找新的地址
        if (this._get(index)) {
            return this.c1(index)
        } else {
            return index
        }
    }

    // 冲突 拉链法: 通过将一组冲突的同义词都放入到链表里面。 比如上述冲突地址为5 那么arr中k=5时,值指向一个链表, 链表里通过比对真实的k来获取相应的值。
    c2(k) {
        let list = this.arr[k]
            // 伪代码用来描述
        while (list) {
            if (list.key === k) {
                return list.value
            }

            list = list.next
        }

    }

    // 负载因子
    getAlpha() {
        return this.count / this.arr.length
    }

    _get(index) {
        return this.arr[index]
    }

    get(k) {
        let index = this.hash(k)
        return this.arr[index]
    }

    add(k, v) {
        let index = this.hash(k)
        this.arr[index] = v
    }

    delete(k) {
        let index = this.hash(k)
        delete this.arr[index]
    }
}


function main() {
    let table = new HashTable()
    table.hash(1256)
}

main()