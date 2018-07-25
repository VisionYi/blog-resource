---
title: ES6 箭頭函數 Arrow Function
date: 2018-01-05
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
    - Arrow Function
    - 箭頭函數
    - =>
---

它是 ES6 標準裡其中非常受歡迎的新語法，允許使用 `=>`(箭頭) 來定義函數，比起一般函數可以用更簡短的語法來表示，可以讓程式碼的可閱讀性提高。

<!-- more -->

- 基本語法為 `函數的參數 => 返回值的內容`

```javascript
// 一般函數寫法，輸入半徑求圓面積
let circleArea = function(r) {
    return r * r * 3.14;
}

// 箭頭函數寫法
let circleArea = r => r * r * 3.14;
circleArea(10); // 314
```

## 使用特性
- 擁有**匿名函數** (anonymous function) 的特性
- 若**無參數**或有**多個參數**，需要在參數部分加上括號`()`

```javascript
// 無參數
let greeting = () => 'Hello';

// 多個參數
let add = (n1, n2) => n1 + n2;

console.log(greeting());  // 'Hello'
console.log(add(10, 20)); // 30
```

- 若返回值或參數有包含`{}`，像是**物件內容**，需要在外圍加上括號`()`

```javascript
let foo = () => ({x: 10, y: 20});
let foo2 = ({x, y}) => x + y;

console.log(foo()); // {x: 10, y: 20}
console.log(foo2({x: 1, y: 2})); // 3
```

- 若箭頭後面的程式區塊是**陳述式**或**多條語句**，需要加上大括號`{}`

```javascript
let getDate = () => {
    let date = new Date();
    return date.toISOString().substr(0, 10);
}

console.log(getDate()); // 2018-01-03
```

- 非常適合簡化回調函數 (callback function)

```javascript
let arr = [1, 2, 3];
arr.map(num => num * 10);

console.log(arr); // [10, 20, 30]
```

- 箭頭函數也跟一般函數一樣，參數可以有**預設值、解構賦值、rest 參數**的功能
- 另外箭頭函數中沒有 `arguments` 物件，需要使用 rest 參數代替


## 綁定 this
- 原本一般函數裡的 this 物件的指向是可變的，會隨著外層運作的函數而改變
- 但是在箭頭函數中，**它會變成固定的**，this 會被綁定在當時"**所定義的作用域中**"，而不會隨著環境改變成指向"**運作時的作用域中**"

```javascript
// 使用 addEventListener 監聽事件
var button = document.querySelector('button');
var fn_arrow = () => {
  // 建立 function 時 this 指向 Window
    console.log(this.constructor.name);  // 執行 function 時 this 指向 Window
};
var fn = function(){
  // 建立 function 時 this 指向 Window
    console.log(this.constructor.name);  // 執行 function 時 this 指向 HTMLButtonElement
};

button.addEventListener('click', fn_arrow);
button.addEventListener('click', fn);
```
> 上面程式範例參考來自: https://pjchender.blogspot.tw/2017/01/es6-arrow-function.html

- 下面另一個例子，箭頭函數會綁定外層定義的 this 物件，而一般函數則會指向正在運作自己的函數

```javascript
function Timer() {
    this.s1 = 0;
    this.s2 = 0;

    // 箭頭函數，會綁定外層定義的 this
    setInterval(() => this.s1++, 100);

    // 一般函數，指向正在運作自己的函數
    setInterval(function () {
        this.s2++;
    }, 100);
}

const timer = new Timer();

// 過 0.3 秒後觀察 timer.s1 與 timer.s2 的變化
setTimeout(() => console.log('s1: ', timer.s1), 350);
setTimeout(() => console.log('s2: ', timer.s2), 350);
// s1: 3
// s2: 0
```

- 由於箭頭函數的 this 已經被綁定住了，所以不能使用函數的 `call()`、`apply()`、`bind()` 這些方法去改變 this 的指向

```javascript
let people = {
    name: 'Bob'
}
const fn_arrow = () => {
    console.log(this);
}
const fn = function () {
    console.log(this);
}

fn_arrow.call(people); // 箭頭函數，this 依然還是 window 物件
fn.call(people);  // 一般函數，this 則改變成 people 物件
```

### 好處
- 編寫內層函數想取用外層的 this 物件時，可以省略 `var self = this` 此步驟而直接使用了
- 解決了在建立內層函數或填入回調函數時的，裡面的 this 可能會指向全域物件 window 的問題

## 不可使用箭頭函數的情況
1. DOM 在處理監聽事件`addEventListener()`時，**放入的回調函數**盡量不要使用箭頭函數
    - 因為 this 不會隨著監聽事件所操作的 DOM 物件而改變

2. 定義物件屬性中的**方法**，或者定義建構函數的 **`prototype`方法**，不能使用箭頭函數來定義
    - 因為 this 不會指向物件或建構函數本身，而是全域物件 window 或是外層的作用域(函數)

3. **定義建構函數**，一樣不能使用箭頭函數來定義
    - 因為在定義完後，只要使用`new`產生此建構的物件就會報錯
