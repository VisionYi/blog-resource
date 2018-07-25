---
title: ES6 Symbol 資料類型
date: 2018-01-10
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
    - Symbol
    - 獨一無二
---

這是 ES6 中一種新的原始資料類型，表示**獨一無二的值**，Symbol 的值通過`Symbol`函數生成，可以**保證不會與其他屬性名或數值產生衝突**，所以很適合用來代替傳統**定義常數內容值的方式**。

<!-- more -->

```javascript
let s = Symbol();

typeof s  // "symbol"

// 定義常數內容值
const ERROR = Symbol();
const NOTICE = Symbol();
const WARNING = Symbol();
const CRITICAL = Symbol();
```

## 基本使用
- Symbol 函數可以接受一個字串作為參數
- Symbol 值不能與其他類型的值進行運算
- Symbol 值可轉成完全字串，使用`toString()`方法，若有參數也會一同輸出
- Symbol 值可作為物件中的屬性名，使用中括號`[]`，**能防止此屬性名(關鍵字)被改寫或覆蓋**

```javascript
// 獨一無二不會有任何相同的值，儘管接受的參數是相同的
let s1 = Symbol('new');
let s2 = Symbol('new');

s1 === s2 // false


// 可轉成完全字串
console.log(s1.toString()); // 'Symbol(new)'


// 可作為物件中的屬性名
let obj = {
    [s1]: 'Hello!'
};

console.log(obj); // { Symbol(new): "Hello!" }
```

## 進階使用
Symbol 作為屬性名時，該屬性不會出現在`for...in`、`for...of`迴圈迭代中，也不會在`Object.keys()`、`Object.getOwnPropertyNames()`等等之類的方法中被獲取，**只有唯一使用`Object.getOwnPropertySymbols()` 此方法才能獲取擁有 Symbol 值的屬性名**。

```javascript
let s1 = Symbol('s1');
let s2 = Symbol('s2');
const obj = {
    [s1]: 'Hello',
    [s2]: 'World'
};

for (let key in obj) {
    console.log(key); // 無輸出
}

let propertyNames = Object.getOwnPropertyNames(obj);
console.log(propertyNames); // []


let propertySymbols = Object.getOwnPropertySymbols(obj);
console.log(propertySymbols); // [ Symbol(s1), Symbol(s2) ]
```

### 應用:
- Symbol 屬性不會被常規方法獲取，適合用在定義物件類別(class)中的非私有的、但又希望只用於內部的方法

## Symbol.for() & Symbol.keyFor()

- `Symbol.for()`: 可以重新使用同一個 Symbol 值，若定義時輸入參數一樣，則 Symbol 值會相等
- `Symbol.keyFor()`: 可以取得在使用`Symbol.for()`定義時所輸入的參數值
- 使用此 2 個函數方法來重複利用資源

```javascript
let s1 = Symbol.for('new');
let s2 = Symbol.for('new');

s1 === s2 // true
Symbol.keyFor(s1) // 'new'


// 由於 Symbol() 是沒有登記機制的，所以使用 .keyFor() 會無效
let s3 = Symbol('new');
Symbol.keyFor(s3) // undefined
```

### Symbol.iterator
作為 ES6 iterator(迭代器)的建構方法名稱，可參考: [ES6 Iterators in Depth](https://ponyfoo.com/articles/es6-iterators-in-depth)。
