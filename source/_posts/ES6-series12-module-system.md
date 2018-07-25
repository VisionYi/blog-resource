---
title: ES6 Module System 模組系統
date: 2018-01-12
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
    - Module System
    - 模組系統
    - import
    - export
    - 輸出 輸入
---

ES6 導入了模組系統的支援，它採用了 CommonJS 與 AMD 的優點，**在編譯時進行靜態加載，而且可以使用於瀏覽器與伺服器端**。概念上是將一個大程序拆分成互相依賴的小文件，需要用到時就拼裝起來使用，這對開發大型或複雜的專案是很重要的。

<!-- more -->

## 特性
- ES6 的模組程式碼會自動採用嚴格模式，不管是否有使用`"use strict"`
- ES6 的模組是一個檔案一個模組
- 主要使用兩個語句構成 :
    - **`export`做為模組對外的輸出**，放於檔案最後
    - **`import`做為輸入其他模組的功能**，放於檔案開頭

## 基本的輸出與輸入
- 物件、類別、函數、常數...等等有變數名稱的都可以輸出
- 都可以使用`as`關鍵字**重新命名變數名稱**

### export 輸出方式
1. 在定義時直接做為輸出

```javascript
export let str = 'Hello';
export const obj = {a: 1};

export function foo() {
    console.log('function test');
}
```

2. 使用已定義好或已存在的變數做為輸出，須加上大括號`{}`，用來**統一輸出**

```javascript
// 使用大括號"{}"做統一輸出
let str = 'Hello';
const obj = {a: 1};

let foo = function() {
    console.log('function test');
}

// 也能使用 as 重新命名
export {str, obj, foo as fooTest};
```

### import 輸入方式
1. 使用**大括號**`{}`輸入模組中有被 export 過的變數，後面加上檔案路徑或模組名稱
2. 使用**萬用字元**`*`輸入模組中所有被 export 過的變數
3. 直接加載整個模組名稱，只用來執行模組而已

```javascript
// 基本使用，假設輸出模組的檔案名稱為 myModule.js
import {str, obj, fooTest} from './myModule.js';

fooTest();


// 使用萬用字元*
import * as module from './myModule.js';

console.log(module.str);
console.log(module.obj);


// 直接加載整個模組名稱
import 'jquery';
```

## 使用 `export default` 輸出與輸入
- 主要是用來當作模組檔案**唯一的接口**，指定為模組的"**默認輸出**"
- 可以輸出**匿名型態的函數、類別**
- 輸入時可以**指定任意名稱**做為輸入的變數
- 輸入與輸出都不必再加上大括號`{}`了
- 一個模組只能有一個默認輸出

```javascript
// 檔名: export.js
function circleArea(r) {
    return console.log('area: ', r * r * 3.14);
}

export default circleArea;

// --------------------------------------------

// 檔名: import.js
import getArea from './export.js';

getArea(10); // area: 100
```

## export 與 import 的複合寫法
概念為**可以先輸入後輸出同一個模組**，export 和 import 語句結合在一起的意思。主要用來**把接口輸出改名**或**改成默認的接口輸出**。

```javascript
export { obj, foo } from './myModule.js';

// 等同於
import { obj, foo } from './myModule.js';
export { obj, foo };


// 改成默認的接口輸出
export { foo as default } from './lib.js';

// 等同於
import { foo } from './lib.js';
export default foo;
```

## 如何在瀏覽器中運行實現
基本上 ES6 的程式碼使用 Babel 轉譯成舊式的 JS 語法已經習以為常，但現今已有許多瀏覽器都支援 ES6 與模組系統了，可以直接寫入語法，支援的瀏覽器參考 [Can I use ...](https://caniuse.com/#search=module)

運行模組系統使用以下方式 :

- 使用`<script>`標籤，再加入`type="module"`屬性，直接放入 HTML 檔案上就行了
- **只需要寫入主要執行的 JS 檔案**，其他組件或外部檔案可以不必寫入，**模組系統會自動去關聯其他被 import 的 JS 檔案**

```javascript
// 檔名: main.js
import module from './myModule.js';
// ...

// --------------------------------------------

// 檔名: index.html
<script type="module" src="./main.js"></script>
```

- 瀏覽器也允許內嵌語法在 HTML 網頁中

```html
<script type="module">
  import module from './myModule.js';
  // ...
</script>
```
> 註 : 有些瀏覽器需要藉由伺服器去運行，直接開啟 HTML 檔案是不行的
