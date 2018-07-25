---
title: ES6 宣告方式 let、const
date: 2017-12-23
update: 2017-12-26
categories: ES6-重點紀錄
tags:
    - JavaScript
    - ES6
keywords:
    - JavaScript
    - ES6
    - ECMAScript 6
    - 重點紀錄
    - let
    - const
    - 變數宣告
    - 常數宣告
---

ES6 新的兩種宣告方式，主要是用來取代`var`舊式宣告，新的方式讓變數本身涉及的範圍變小了，改善了許多潛在問題。

- let 為變數宣告
- const 為常數宣告

<!-- more -->

```javascript
let es6 = 'Hello World';
const Pi = 3.14;
```

## let 變數宣告
- `let`宣告方式類似於`var`

- 變數不允許被重複宣告

- 只受區塊作用域(Block Scope)內影響，意思是變數的作用範圍只在大括號`{}`中有效
    - 這解決了`var`會自動宣告為全域變數的問題
    - 所以`let`非常適合使用在`for`迴圈中

```javascript
// let 只會在區塊作用域內有效
if (true) {
    let a = 10;
    var b = 20;
}
console.log(a); // ReferenceError: a is not defined.
console.log(b); // 20


// 使用 var 在 for 迴圈上 i 會自動成為全域變數
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log('Times: ' + i);
    }, 100);
}
// 產生 'Times: 5' 5 次相同的結果
// 因為函數裡的 i 會指向同一個全域變數 i (最終改變的結果)


// 使用 let 在 for 迴圈上
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log('Times: ' + i);
    }, 100);
}
// 產生 'Times: 0 ~ 4' 5 次不同的結果
```

- 立即執行函數表達式（IIFE）可以不必再使用了
    - 因為變數不會汙染到全域環境中

```javascript
// IIFE 寫法
(function () {
    var tmp = 'Hi';
    // ...
}());

// 區塊作用域寫法，一樣可以達到相同效果
{
    let tmp = 'Hi';
    // ...
}
```

## const 常數宣告
- 當宣告為一般的數據類型 (string、number、boolean) 時
    - 一定要賦予值
    - 不能再被修改

- 當宣告為物件或陣列 (object、array) 時
    - 內層的屬性是可以被修改或新增的
    - 代表`const`是指向固定的記憶體位址，所以與本身內在的屬性無關，只是無法再讓本身指向另一個位址(變數)而已

```javascript
const school = {
    name: 'Hello World',
    student: 10
};

// 物件本身內的屬性是可以被修改或新增的
school.name = 'ES6';
school.teacher = 3;

console.log(school);
// {
//   name: 'ES6',
//   student: 10,
//   teacher: 3
// }

// 當被宣告為常數的物件時，就不能再去指向其他值了
school = {}; // TypeError: Assignment to constant variable.
```
