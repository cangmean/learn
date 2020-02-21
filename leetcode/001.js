// 两数之和

var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {

        // 新的数组
        let items = nums.slice(i + 1);
        // 具体差值
        let val = target - nums[i]
        if (items.length > 0) {
            let idx = items.indexOf(val)
            if (idx > -1) {
                return [i, i + idx + 1]
            }
        }
    }
};

let nums = [2, 7, 11, 15]
let target = 9

console.log(twoSum(nums, target))