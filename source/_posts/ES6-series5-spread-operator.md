---
title: ES6 擴展運算子 Spread Operator
date: 2018-01-02
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
    - Spread
    - Spread Operator
    - 擴展運算子
    - array
---

ES6 加入了新的運算子`...` Spread Operator，簡化了展開**陣列**的過程，應用上真的非常廣，像是取值、複製、合併、轉換型態、取代舊式 API...等等，這些都改善或簡化了 JavaScript 的邏輯程序，讓程式有了更多元的發展。

<!-- more -->

## 概念與用途
- 主要是展開單一個陣列 array，轉化為**多個逗點隔開的獨立參數**
- 此運算子由三個點`...`組成，後面再加上你要轉換的陣列

```javascript
let spread = [1, 2, 3];

console.log(...spread); // 1 2 3
console.log(...['a', 'b']); // 'a' 'b'
// 等同於
console.log(1, 2, 3);
console.log('a', 'b');
```

- 主要是用在**執行函數時的參數列**上
- 所以可以直接取代函數的 [`apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法

```javascript
function foo(a, b, c) {
    console.log(a + b + c);
}
let arr = [10, 20, 30];

foo(...arr); // 60
// 等同於
foo.apply(null, arr); // 60
```

## 使用特性
- 擴展了陣列本身，可以嵌入在陣列裡

```javascript
let a1 = ['x', 'y'];
let a2 = ['w', ...a1, 'z'];

console.log(a2); // ['w', 'x', 'y', 'z']
```

- 可以用來複製陣列

```javascript
let a1 = [1, 2];
let a2 = [...a1];

console.log(a2); // [1, 2]
```

- 可以用來合併串聯多個陣列

```javascript
let a1 = ['Hello', 'world'];
let a2 = [1, 2, 3];
a2 = [...a2, ...a1];

console.log(a2); // [1, 2, 3, 'Hello', 'world']

// 等同於
a2 = a2.concat(a1);
```

- 可以將字串展開為各單一字元

```javascript
let text = [...'Hello'];
console.log(text); // ['H', 'e', 'l', 'l', 'o']
```

## 使用在物件上
- 根據[Object Rest/Spread Properties for ECMAScript Stage 3](https://github.com/tc39/proposal-object-rest-spread)的內容，其實**物件**也能夠使用這個運算子，只是目前還未正式加入 ES6 的標準中
- 基本上與陣列的使用方式大同小異，合併多個物件是非常實用的，甚至可以取代`Object.assign`方法

```javascript
let obj1 = { name: 'foo', x: 10 };
let obj2 = { name: 'test', y: 20 };

// 複製物件
let clonedObj = { ...obj1 };
console.log(clonedObj);  // { name: 'foo', x: 10 }


// 合併串聯多個物件
// 與陣列不同的是: 有相同屬性名的，合併後只會使用最後一個物件的內容值
let mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj);  // { name: 'test', x: 10, y: 20 }
```

## 其他應用
- 使用在陣列的 `push()` 方法上

```javascript
let list = [1, 2];
list.push(...[3, 4]);

console.log(list); // [1, 2, 3, 4]

// 等同於
list.push.apply(list, [3, 4]);
```

- 使用在 JavaScript 的自訂日期 Date 物件

```javascript
let today = new Date(...[2018, 1, 1]);
// 等同於
let today = new (Date.bind.apply(Date, [null, 2018, 1, 1]));

console.log(today); // Thu Feb 01 2018 00:00:00 GMT+0800 (台北標準時間)
```

- 轉換型態，把類似陣列的資料轉換成真的陣列型態

```javaScript
// 取得 HTML DOM 使用到 querySelectorAll()
// 所得到的資料為 NodeList 物件結構
const nodeData = document.querySelectorAll('body');
const arrayData = [...nodeData];

console.log(nodeData);  // NodeList [body]
console.log(arrayData); // [body]
```

---

這個`...`擴展運算子與 ES6 中另一個新加入的 **Rest 參數**看起來很相似，但它們卻是相反的關係，下次的主題將會來解說到~
