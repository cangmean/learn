// 循环两个有序数组的中位数  => 转化为在两个数组中找第 K 个小的数

var findMedianSortedArrays = function (nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    let left = Math.floor((n + m + 1) / 2);
    let right = Math.floor((n + m + 2) / 2);

    var find_kth = function (nums1, start1, end1, nums2, start2, end2, k) {
        // 数组的下标， 以及k值
        console.log('start1', start1, 'end1', end1)
        console.log('start2', start2, 'end2', end2)
        console.log('k', k)

        // 真是的数组长度， 根据下标获取
        let len1 = end1 - start1 + 1
        let len2 = end2 - start2 + 1

        // 总是将长度小的数组设置为第一个
        if (len1 > len2) {
            return find_kth(nums2, start2, end2, nums1, start1, end1, k)
        }

        // 一个数组为空那么，第k个值在另一个数组上返回
        if (len1 == 0) {
            return nums2[start2 + k - 1]
        }

        if (k == 1) {
            return Math.min(nums1[start1], nums2[start2])
        }

        // 找出第 k / 2 个大的值， 二分法去掉原来数组的长度
        let i = start1 + Math.min(len1, Math.floor(k / 2)) - 1
        let j = start2 + Math.min(len2, Math.floor(k / 2)) - 1

        console.log('   i', i)
        console.log('   j', i)
        console.log('   nums1[i]', nums1[i])
        console.log('   nums2[j]', nums2[j])
        console.log('-------------------- ')


        // j - start1 + 1 或 i - start1 + 1 都是遗弃的值的长度，用来计算新的k值
        if (nums1[i] > nums2[j]) {
            return find_kth(nums1, start1, end1, nums2, j + 1, end2, k - (j - start2 + 1))
        } else {
            return find_kth(nums1, i + 1, end1, nums2, start2, end2, k - (i - start1 + 1))
        }

    }
    // 考虑奇偶的情况
    return (
        find_kth(nums1, 0, m - 1, nums2, 0, n - 1, left)
        + find_kth(nums1, 0, m - 1, nums2, 0, n - 1, right)
    ) * 0.5

};


let nums1 = [11, 12, 13, 14]
let nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let i = findMedianSortedArrays(nums1, nums2)
console.log(i)