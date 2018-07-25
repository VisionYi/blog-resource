---
title: ES6 函數中的預設參數 & Rest 參數
date: 2018-01-04
update: 2018-01-25
categories: ES6-重點紀錄
tags:
    - JavaScript
    - ES6
keywords:
    - JavaScript
    - ES6
    - ECMAScript 6
    - 重點紀錄
    - function
    - Default parameters
    - 預設
    - Rest
    - arguments
---

JavaScript 終於讓函數也能有預設值了，在 ES6 中為函數加入了預設參數 (Default parameters) 與 Rest 參數的語法，在設計或建構時能更直覺的加入參數值了。

<!-- more -->

## 函數中的預設參數
### 主要用途
預設參數是為了代替傳統的方式，解決了需要判斷是否為`undefined`才能設置預設值的麻煩

```javascript
// 函數中的預設參數
function multiply(a, b = 1) {
    return console.log(a * b);
}
// 等同於
function multiply(a, b) {
    b = (typeof b !== 'undefined') ?  b : 1;
    return console.log(a * b);
}

multiply(10, 2); // 20
multiply(10); // 10
```

### 使用特性
- 預設參數可以是任何表達式，甚至可以取前一個變數來使用

```javascript
function defaultParam(){ return 'test'; }
function foo(a, b = a * 2, c = defaultParam()) {
    console.log(a, b, c);
}

foo(10); // 10 20 'test'
```

- 預設參數可以與解構賦值結合使用

```javascript
// 函數參數的預設值設為空物件，也設置了解構賦值的預設值
// 此方式是為了避免產生 undefined
// 只要不是傳入物件，對應錯誤就會觸發參數預設值，再進而觸發解構賦值的內容
function foo({x = 0, y = 0} = {}) {
    return console.log([x, y]);
}

foo();    // [0, 0]
foo({});  // [0, 0]
foo({x: 10, y: 20});  // [10, 20]
foo({x: 5});    // [5, 0]
foo({z: 1});    // [0, 0]
```

- 如果傳入`undefined`將會觸發參數等於預設值，但傳入`null`則沒有這個效果

```javascript
// 放入 undefined 與 null 的差別
function foo(x = 5, y = 10) {
    console.log(x, y);
}

foo(undefined, null); // 5 null
```

## Rest 參數
### 主要用途
- Rest 參數是取得剩下的參數後存放在同一個陣列裡
- 由三個點組成`...`，後面再加上**陣列變數名稱**，與擴展運算子很相似，但兩者是相反的概念
- 主要是代替函數中的`arguments`物件，其實不能說完全取代，因為`arguments`內還有其他參數，但常用來獲取裡面的陣列，只是繁瑣的轉換過程比較麻煩

```javascript
// 函數中的 Rest 參數
function foo(...rest) {
    return console.log(rest);
}
// 等同於
function foo() {
    return console.log(Array.prototype.slice.call(arguments));
}

foo(); // []
foo(10, 20, 30); // [10, 20, 30]
```

### 使用特性
- rest 參數必須是最後一個參數，否則會產生錯誤

```javascript
function foo(a, ...b, c) {}
// SyntaxError: Rest parameter must be last formal parameter
```

- 主要是放在函數中使用，但也能拿來做**解構賦值**
- 在進行解構賦值時，等號左邊可以使用 rest 參數，右邊使用為 spread 擴展運算子

```javascript
// 使用在解構賦值上
// 將兩個陣列合併後再做排序大小，最後取出第一個值
let spread1 = [5, 2, 8];
let spread2 = [6, 1, 3];

let [first, ...rest] = [...spread1, ...spread2].sort();

console.log(first); // 1
console.log(rest); // [2, 3, 5, 6, 8]
```
