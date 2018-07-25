---
title: ES6 其他的 API 與特性擴展
date: 2018-01-13
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
    - API
    - 特性擴展
    - Promise
    - Set
    - Proxy
    - Reflect
    - Generator
---

在 JavaScript ES6 標準規範中，其實還有很多的新擴展、新語法、新 API 都很有特色，只是這些就比較不常用了，大部分的功能也都能使用舊方法去實現，至少這些新事物能幫助簡化程序就是一大進步了。

本篇將會簡單地介紹 ES6 其他較實用常見的 API 與擴展，主要知道基本內容就好，並不會深入探討。

<!-- more -->

## JavaScript ES6 其他常見的新 API
### Promise 物件
- Promise 是一種非同步 (asynchronous) 處理的解決方案
- 特別參考
    - [JavaScript ES6 Promise Object 物件](https://www.fooish.com/javascript/es6/Promise.html)
    - [JavaScript ES6 Promise](https://wcc723.github.io/life/2017/05/25/promise/)
- 實用範例參考
    - [Promise 實例 & 程式碼片段](https://eyesofkids.gitbooks.io/javascript-start-es6-promise/content/contents/snippets.html)
    - [Fun with promises in JavaScript](https://www.stephanboyer.com/post/107/fun-with-promises-in-javascript)

### Set 物件
- 這是新的資料結構物件，Set 類似於陣列，但內容成員不會有重複的值
- 放入有重複的值將會被覆蓋，內容成員總數不變
- 與 Map 物件一樣都有類似的操作方法與迭代方法

```javascript
let set = new Set();

// 可以使用 add() 方法設置資料內容
set.add(10);
set.add(10);
set.add('text');
set.add({sayHi: 'Hi'});

console.log(map);
// Set(4) {10, "text", {sayHi: "Hi"}}
```

### Proxy 物件
- 概念為重新定義 JavaScript 中某些操作的原始行為，攔截那些操作方法去改變它
- 應用範例 :
    - 利用 Proxy 可以讓 "**讀取 Object 的屬性值**" 轉變為 "**執行某個函數**"，從而實現屬性的方法操作，不需要建立函數
    - 利用 Proxy 可以讓 "**設定 Object 的屬性值**" 作為 "**數據綁定**"，發生變化時就會自動更新 DOM 與瀏覽器上的渲染

```javascript
// 這是基本語法
var proxy = new Proxy(target, handler);

// 此用來攔截變數的 "物件內容"，改變它的原始行為
var proxy = new Proxy({}, {
    get: function(target, propKey, receiver) {
        return 'getting';
    },
    set: function(target, propKey, value, receiver) {
        console.log('setting');
    }
});

console.log(proxy.test);  // 'getting'
console.log(proxy.other); // 'getting'

// 以下都會執行 console.log('setting');
proxy.abc = 10;
proxy[10] = 'test';
```

### Reflect 物件
- 概念也是攔截 JavaScript 中某些操作方法去改變它
- Reflect 可以在 Proxy 的內部方法調用，確保該操作方法會執行原始的行為，然後再執行 Proxy 內定義的額外的功能
- 另外 Reflect 物件的其他用途
    - 可以用來取代 Object 原型中部分的操作方法，改善了一些物件原始結構的問題

### Generator 生成器函數
- 它有點類似一般的函數，使用關鍵詞`function*`
- Generator 的運作概念就像是一個狀態機 (state machine)，會一直改變內部的不同狀態
- 取得的 Generator 物件，起始狀態會先暫停什麼都不做，而每次執行`next()`方法，就會繼續執行函數，直到遇到下一個 yield 關鍵字，又會暫停函數的執行，而每一次暫停時會 yiled (產出)一個當前狀態值
- yiled 會返回一個`{value: anyType, done: boolean}`結構的物件
- Generator 產生的物件也有 Iterator 的性質，所以可以用`for...of`迭代迴圈去取得 yield 返回的 value 值

```javascript
function* gen() {
    yield 1;
    yield 2;
}

var g = gen();

// 第一次執行 next() - 停在 yield 1
// 返回 Object {value: 1, done: false}
g.next();

// 第二次執行 next() - 停在 yield 2
// 返回 Object {value: 2, done: false}
g.next();

// 第三次執行 next() - 沒有 yield 將會結束
// 返回 Object {value: undefined, done: true}
g.next();
```

## JavaScript ES6 其他較實用的擴展
- 字串 (Sting) 可使用 **Unicode 表示法**

```javascript
// Unicode 表示法
console.log("\u{41}\u{42}\u{43}"); // ABC
```

- 數值 (Number) 可以使用**二進制和八進製表示法**
    - 前綴須加上`0b`(或`0B`)、`0o`(或`0O`)表示
- 數值 (Number) 可以使用`**`關鍵字當作**指數運算**

```javascript
// 二進制和八進製表示法
console.log(0b1100011); // 99
console.log(0o143); // 99

// 指數運算
console.log(2**6); // 64
```

## JavaScript ES6 其他新功能 - 參考網址
- [ECMAScript 2015 support in Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla)
