---
title: ES6 樣板文字串 Template literals
date: 2018-01-01
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
    - string
    - Template literals
    - Template String
    - 樣板字串
    - 模板字串
---

ES6 導入了樣板文字串 Template literals 是為了增強字串的表示方式，還能直接填入變數與表達式，可以更方便地輸出想要的文字組合了。

<!-- more -->

## 使用特性
- 樣板文字串需使用**反引號標識**`‵  ‵`包起來表示
- 可以寫入**多行的字串**

```javascript
// 可寫入多行的字串
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);

// 等同於
$('#list').html(
    '<ul>\n' +
      '<li>first</li>\n' +
      '<li>second</li>\n' +
    '</ul>'
);
```

- 可以**嵌入變數或任何的表達式**，需要使用`${ }`來嵌入
- 注意: **換行與空白字元**都會被保留，可使用字串的`trim()`方法來消除

```javascript
// 可以嵌入變數
let name = "Bob", time = "today";
console.log(`Hello ${name}, how are you ${time}?`);
// 'Hello Bob, how are you today?'


// 可以嵌入任何表達式，例如函數、加減運算
let today = new Date();
let text = `The time and date is ${today.toLocaleString()}`;

console.log(text);
// The time and date is 2018/1/1 下午6:10:10
```
