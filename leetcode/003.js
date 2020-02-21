// 无重复字符的最长子串


var lengthOfLongestSubstring = function (s) {
    let arr = []
    let max = 0;
    for (let i of s) {
        let idx = arr.indexOf(i)
        if (idx > -1) {
            // 删除之前的字符
            arr.splice(0, idx + 1)
        }
        arr.push(i)
        max = arr.length > max ? arr.length : max
    }
    return max
};


let l = 'abcabcbb'

console.log(lengthOfLongestSubstring(l))