---
title: 二分查找
date: 2022-03-01
tags:
- algorithm
---

## 二分查找

```js
// nums 递增
let binarySearch = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + ((right - left) >> 1);

    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

因为我们是要查找一个数存不存在，所以当 `left == right` 时，我们也应该继续执行 `while` 查找。
