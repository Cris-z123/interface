/**
 * 调整数组顺序使奇数位于偶数前面
 * @param {array} nums
 * @returns 
 */

const exchange = nums => {
    let [left, right] = [0, nums.length - 1]

    while(left < right) {
        while(left < right && nums[left] & 1) {
            left++
        }
        while(left < right && nums[right] & 1) {
            right--
        }
        [nums[left], nums[right]] = [[nums[right]], nums[left]]
    }

    return nums
}
