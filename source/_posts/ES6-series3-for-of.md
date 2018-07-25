---
title: ES6 取值迴圈 for...of
date: 2017-12-30
update: 2017-12-31
categories: ES6-重點紀錄
tags:
    - JavaScript
    - ES6
keywords:
    - JavaScript
    - ES6
    - ECMAScript 6
    - 重點紀錄
    - for of
    - for in
    - 迴圈
    - 迭代器
    - iterator
---

ES6 新的迭代迴圈方法，基本上可以取代傳統上陣列的`forEach()`方法，另外這跟`for...in`迴圈很相似，但這兩者的用法是不同的，以下會多舉例比較他們之間的關係。

<!-- more -->

## 概念與用途
- 相對於`for...in`是取得物件的 "鍵名/屬性名"，而`for...of`是取得物件的 "鍵值/屬性值"
- 可以使用的範圍包括 Array、Set、Map、字串或實作迭代器(Iterator)介面的物件
- 除了可用在陣列結構上，主要還是用來獲取有迭代性質物件的內容

```javascript
let arr = ['a', 'b', 'c', 'd'];

// for...in 取得 "鍵名/屬性名"
for (let key in arr) {
    console.log(key); // '0' '1' '2' '3'
}

// for...of 取得 "鍵值/屬性值"
for (let value of arr) {
    console.log(value); // 'a' 'b' 'c' 'd'
}


// 使用在字串上
let string = 'Hello';

for (let i of string) {
    console.log(i); // 'H' 'e' 'l' 'l' 'o'
}
```

## 使用特性
- for...of 迴圈只會返回**具有數字索引屬性的內容**

```javascript
let arr = ['a', 'b', 'c']
arr.text = 'Hello';

for (let i in arr) {
    if (arr.hasOwnProperty(i)) {
        console.log(i); //  '0', '1', '2', 'text'
    }
}

for (let i of arr) {
    console.log(i); // 'a', 'b', 'c'
}
```

- 可使用陣列的`entries()`方法來獲取`[key, value]`

```javascript
let arr = ['a', 'b', 'c', 'd'];

for (let [key, value] of arr.entries()) {
    console.log(key, value);
}
// 0, 'a'
// 1, 'b'
// 2, 'c'
// 3, 'd'
```

- 內層是陣列或物件類型的資料時，可以直接以**解構賦值**的方式去迭代循環取出
    - 如果取出的變數沒有對應到值，則會變成`undefined`

```javascript
// 內層為陣列類型時
let arr = [
    [1, 2, 3],
    [4, 5, 6],
    ['Hello', 'world']
];

for (let [x, y, z] of arr) {
    console.log(x, y, z);
}
// 1, 2, 3
// 4, 5, 6
// 'Hello', 'world', undefined


// 內層為物件類型時
let family = [
    {name: 'ES6', type: 'JavaScript'},
    {name: 'for', type: 'Iterator'}
];

for (let {name, type} of family) {
    console.log(name + ': ' + type);
}
// 'ES6: JavaScript'
// 'for: Iterator'
```
