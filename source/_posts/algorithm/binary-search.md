---
title: 二分查找
date: 2022-03-01
categories:
- algorithm
---

## 二分查找

### 基本的二分搜索

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
};
```

因为我们是要查找一个数存不存在，所以当 `left == right` 时，我们也应该继续执行 `while` 查找。

### 寻找左侧边界的二分搜索

```js
let searchLeftBound = function (nums, target) {
  if (nums.length == 0) return -1;
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = left + ((right - left) >> 1);

    if (nums[mid] == target) {
      right = mid;
    } else if (nums[mid] > target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }

  return nums[left] == target ? left : -1;
};
```

对于 `nums = [1, 2, 2, 2, 3]` 和 `target = 2` 而言，`left` 的结果为 `1`，可以理解为 `nums` 中小于 `2` 的个数有 1 个。
当 `target` 大于 `nums` 所有数时，`left` 的结果为 `nums.length`；此时 `nums[left]` 即 `nums[nums.length]` 为 `undefined`，必然不等于 `target`。

### 寻找右侧边界的二分搜索

```js
let searchRightBound = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + ((right - left) >> 1);

    if (nums[mid] == target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }

  if (right < 0 || nums[right] != target) return -1;

  return right;
};
```

当 `nums` 为非递减顺序时，`right < 0` 表示 `target` 比所有元素都小，即算法不断在执行 `right = mid - 1`；
