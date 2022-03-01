---
title: JavaScript 算法常用语法
date: 2022-02-27
categories:
- algorithm
---

## JavaScript 算法常用语法

1. 除2取整

```js
let num = 5;

// let res = Math.floor(num / 2);
let res = num >> 1;
```

2. 拼接字符串 `String.prototype.concat()`

```js
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"

// 可以接受多个参数
'a'.concat('b', 'c') // "abc"
```

3. 截取子字符串 `String.prototype.slice()`

`slice` 方法用于从原字符串取出子字符串并返回，不改变原字符串。它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（**不含该位置**）。

```js
'JavaScript'.slice(0, 4) // "Java"
```

如果省略第二个参数，则表示子字符串一直到原字符串结束。

```js
'JavaScript'.slice(4) // "Script"
```

如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。

```js
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(-2, -1) // "p"
```

4. Unicode 字符串比较

字符串按照**字典顺序**进行比较。

```js
'a' > 'z' // false

'abc' < 'abd' // true

'abc' < 'abcd' // true

'a0b1' < 'a1b1' // true
```

5. 截取子数组 `Array.prototype.slice()`

`slice` 方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
第一个参数为起始位置（从0开始），第二个参数为终止位置（**但该位置的元素本身不包括在内**）。
如果省略第二个参数，则一直返回到原数组的最后一个成员。

```js
var a = ['a', 'b', 'c'];

a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]
```

如果 `slice` 方法的参数是负数，则表示倒数计算的位置。

```js
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
```

6. 删除原数组元素 `Array.prototype.splice()`

`splice` 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。**注意，该方法会改变原数组。**

`splice` 的第一个参数是删除的起始位置（从0开始），第二个参数是**被删除的元素个数**。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

```js
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]
```

7. 数组排序 `Array.prototype.sort()`

`sort` 方法对数组成员进行排序，默认是按照**字典顺序**排序。排序后，**原数组将被改变**。

```js
var arr = ['d', 'c', 'b', 'a'];

arr.sort(); // ['a', 'b', 'c', 'd']

arr // ['a', 'b', 'c', 'd']
```

- `number[]` 升序排序

```js
numbers.sort((a, b) => a - b);
```

- `number[]` 降序排序

```js
numbers.sort((a, b) => b - a);
```

8. 合并数组 `Array.prototype.concat()`

`concat` 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，**原数组不变**。

```js
let arr = ['hello'];

arr..concat(['world'], ['!']) // ["hello", "world", "!"]

arr // ['hello']

[2].concat({a: 1}, {b: 2}) // [2, {a: 1}, {b: 2}]
```

9. 易混淆知识点

- `in` 和 `hasOwnProperty`

```js
var obj = {};

'toString' in obj // true

obj.hasOwnProperty('toString') // false
```

- `typeof`

```js
typeof 1 // 'number'
typeof false // 'boolean'
typeof 'abbc' // 'string'
typeof [] // 'object'
typeof null // 'object'
typeof function() {} // 'function'
typeof undefined // 'undefined'
```
