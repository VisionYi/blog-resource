---
title: ES6 class 類別語法
date: 2018-01-07
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
    - class
    - 類別
    - OOP
    - 物件導向
---

ES6 中的`class`類別，它是效仿其他程式語言擁有物件導向(OOP)的概念，取代需要原型 prototype 的操作，因為寫法更簡潔與易於理解，用來代替 javascript 傳統建構物件的形式。

<!-- more -->

```javascript
class foo {
    // class 的建構子
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // class 的方法
    getPoint() {
        return {x, y};
    }
}

typeof foo // "function"
foo === foo.prototype.constructor // true

let f = new foo(10, 20);

console.log(f.getPoint()); // {x: 10, y: 20}
```

## 使用特性
### 基本使用
- `class` 本身原型是指向建構函數 function
- 本身 `prototype` 的屬性還是存在的
- 內部有個默認的 `constructor` 建構子函數
- `class` 本身也可以使用表達式的來定義

### 進階使用
- 可以使用**靜態方法**，在定義方法的前面加上 `static` 關鍵字
- 可以通過 `extends` 關鍵字進行**物件繼承**
- 繼承後要調用父類的方法或屬性使用 `super` 關鍵字
- 缺陷: 目前沒有 "私有(private)/公開(publice)" 方法與屬性的關鍵字，但可以使用新的資料型態 `Symbol` 唯一性的形式定義

### 細節用法
可以參考: [ES6 class 關鍵字](https://www.fooish.com/javascript/es6/class.html)
