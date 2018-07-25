---
title: ES6 解構賦值 Destructuring Assignment
date: 2017-12-26
update: 2017-12-29
categories: ES6-重點紀錄
tags:
    - JavaScript
    - ES6
keywords:
    - JavaScript
    - ES6
    - ECMAScript 6
    - 重點紀錄
    - Destructuring
    - Array
    - Object
    - 解構賦值
---
ES6 新的概念 **解構賦值**，這使得**傳值**變得更為方便，可以想像是分解一個物品再分別套入對應的組件中，這樣的作法讓 JavaScript 的擴展上變得更為彈性，甚至直接取值不用再做多餘的轉換，提高程式碼更佳的可讀性。

<!-- more -->

## 概念與用途
 - 主要是從物件、陣列中(object、array) 提取資料數值，再指定傳入相對應的變數中
 - 原始上通常只能透過迴圈迭代的方式傳值，現在 Destructuring 能讓程式撰寫上更為簡短便利了

```javascript
// 陣列的解構賦值
let [a, b] = [1, 2];

console.log(a); // 1
console.log(b); // 2


// 物件的解構賦值
const { attr1: x, attr2: y } = { attr1: 10, attr2: 20 };

console.log(x); // 10
console.log(y); // 20


// 物件的屬性也能解構賦值
const { admin, user } = { admin: 'a', user: 'b' };

console.log(admin); // 'a'
console.log(user);  // 'b'
```

## 其他資料類型的解構賦值
- 字串
- 具有迭代器 [Iterator](https://ponyfoo.com/articles/es6-iterators-in-depth) 性質的資料類型
    - 常見的有 Set、Map (這 2 個都是 ES6 中的新產物)
    - 其實上面的字串也有 Iterator 性質

```javascript
// 字串的解構賦值
let [x, y] = 'Hi';
console.log(x, y); // 'H', 'i'


// Set 資料結構
let [x, y, z] = new Set([10, 20, 30]);
console.log(x, y, z); // 10, 20, 30
```
> Set: ES6 中新的資料類型，類似於陣列，但內容成員不會有重複的值

## 特性
### 基本使用
- 可以先宣告變數再解構賦值
- 如果解構失敗或變數沒有對應值，變數的內容就會變成`undefined`
- 可以留空來略過某些值
- 在解構時允許給定**預設值**

```javascript
// 先宣告變數再解構賦值
let x, y;
[x, y] = [5, 10];


// 沒有對應值的情況
let [a, b, c] = [1, 2];
console.log(c); // undefined


// 留空來跳過第二個值
function foo() {
  return [10, 20, 30];
}

let [a, , b] = foo();
console.log(a, b);  // 10, 30


// 允許給定預設值
let [x = 'a', y = 'b'] = ['A'];
let {size = 'big', name = ''} = {name: 'A'};

console.log(x, y); // 'A', 'b'
console.log(size, name); // 'big', 'A'
```

### 進階使用
- 交換變數的值
- 與 **rest 參數**做結合
- 物件的先宣告後解構，需要在外層加上括號`()`，這與陣列稍微不同

```javascript
// 交換變數的值
let a = 1, b = 10;

[a, b] = [b, a];
console.log(a); // 10
console.log(b); // 1


// 與 rest 參數做結合
let [first, ...other] = [1, 2, 3, 4];
console.log(first); // 1
console.log(other); // [2, 3, 4]


// 物件的先宣告後解構, 需加上括號()
let x, y;
({x, y} = {x: 1, y: 2});
```
> rest 參數: `...變數名稱`一樣是 ES6 中的新產物，把剩下的值或參數合在一起轉成陣列

- 可以使用在函數中的**參數**與**回傳值**上
    - 主要是把陣列、物件套用上去，直接取變數的值
    - 內部給定**預設值**也是行的

```javascript
// 使用陣列在函數的參數上
function add([x, y]) {
    return x + y;
}

add([1, 2]); // 3


// 使用物件在函數的參數上
function who({id, name = ''}) {
    console.log('No.' + id + ' is ' + name);
}

const user = { id: 10,  name: 'ES6' };

who(user); // 'No.10 is ES6'


// 使用在函數的回傳值上
function getPoint(){
    let x = 5, y = 10;
    return [x, y];
}

const point = {};
[point.x, point.y] = getPoint();

console.log(point); // {x: 5, y: 10}
```
