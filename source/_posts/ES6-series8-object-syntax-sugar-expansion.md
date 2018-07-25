---
title: ES6 物件語法糖的擴展
date: 2018-01-06
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
    - object
    - 物件 擴展
    - 語法糖
---

物件在 JavaScript 中是非常重要的資料結構，而在 ES6 之後擴展了它的語法結構，讓表示法變得更簡單易懂，還增加了屬性名稱的動態改變。

<!-- more -->

- 擁有更簡潔的表示法
    - 允許直接寫入變數和函數，作為物件的屬性和方法
    - 應用 :
        - 用於簡化函數的**返回值或輸入參數**
        - 使用於**物件的解構賦值**

```javascript
// 對物件直接寫入變數和函數，省略了許多關鍵詞
let birth = '2018/01/01';
let person = {
    name: '老王',

    // 等同於 birth: birth
    birth,

    // 等同於 sayHello: function() {...}
    sayHello() {
        console.log('My name is '+ this.name + ' ' + this.birth);
    }
};

person.sayHello();  // 'My name is 老王 2018/01/01'
```

```javascript
// 簡化函數的物件返回值
function getPoint() {
    let x = 5;
    let y = 10;
    return {x, y};
}

console.log(getPoint()); // { x: 5, y: 10 }
```

- 允許在定義物件時，屬性名稱是可變化的，需用`[]`包覆，但**內容還是只能使用字串**

```javascript
// 定義物件時，屬性名稱是可變化的
let key = 'Hello';
let obj = {
  [key]: true,
  ['a' + 'bc']: 123
};

console.log(obj);  // { Hello: true, abc: 123 }
```
