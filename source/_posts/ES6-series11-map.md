---
title: ES6 Map 物件
date: 2018-01-11
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
    - Map
    - 迭代器
    - iterator
---

這是 ES6 中一種新的資料結構，**每組資料都有對應的 key 值與 value 值**，所以 Map 在意義上類似於物件。

而 key 值的範圍不限於字串，可以是各種類型的值（包括 number、array、object、function、symbol...等等）都可以當作 key，是一種更完善的 Hash 結構實現。

<!-- more -->

```javascript
// Map 基本使用
let map = new Map();

// 可以使用 set() 方法設置資料內容
map.set('first', 1);
map.set(10, 'ten');
map.set({sayHi: 'Hi'}, 'obj');

console.log(map);
// Map(3) {"first" => 1, 10 => "ten", {…} => "obj"}
```

## 內部為 `[key, value]` 的資料結構
- 使用`new`產生 Map 物件
- 在產生 Map 時也可以接收以下的參數
    1. 有著[迭代協議](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Iteration_protocols)的物件結構
    2. 陣列集合，類似 -- `[['key1', 'value1'], ['key2', 'value2']]`
- 搭配`for..of`迭代循環可單獨取得所有的`[key, value]`
- 可以使用`...`擴展運算子取得陣列集合

```javascript
let map1 = new Map();

// 放置陣列集合
let map2 = new Map([
    ['first', 1],
    [10, 'ten'],
    [{sayHi: 'Hi'}, 'obj']
]);

// 搭配 for...of 循環取得[key, value]
for (let [key, value] of map2) {
    // ...
}

// 搭配擴展運算子取得陣列集合
console.log([...map1]);
// []
console.log([...map2]);
// [
//    ['first', 1],
//    [10, 'ten'],
//    [{sayHi: 'Hi'}, 'obj']
// ]
```

## Map 的操作方法
- `set(key, value)`: 設置內容
- `get(key)`: 獲取指定 key 的內容，若找不到返回`undefined`
- `has(key)`: 檢查是否存在此 key，有則返回`ture`，無則返回`false`
- `delete(key)`: 刪除指定 key 的內容，成功返回`ture`，失敗返回`false`
- `clear()`: 刪除所有內容成員
- `size 屬性`: 取得內容成員總數

```javascript
let map = new Map();

map.set('first', 1);
map.set(10, 'ten');
map.set({sayHi: 'Hi'}, 'obj');
map.set(() => 'key', 123);
map.set(Symbol('items'), [1, 2]);

map.get(10)    // 'ten'
map.has('first')    // 'ture'

map.delete('first')
map.get('first')    // undefined

map.size    // 4
map.clear()
map.size    // 0
```

## Map 的迭代方法
這些方法函數所產生的內容都是 "**迭代器(iterator)的資料類型**"，可以使用`for...of`迴圈取得個別單獨的值，也能使用`...`擴展運算符直接轉成陣列類型。

- `keys()`: 取得所有 key
- `values()`: 取得所有成員的值
- `entries()`: 取得所有內容成員
- `forEach()`: 走訪 Map 的所有成員

```javascript
let map = new Map([
    [1, 'one'],
    [2, 'two']
]);

for (let key of map.keys()) {
    console.log(key);
}
// 1
// 2

for (let value of map.values()) {
    console.log(value);
}
// 'one'
// 'two'

for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// 1 'one'
// 2 'two'
// 等同於
for (let [key, value] of map) {
    console.log(key, value);
}

// 也能使用...擴展運算子直接轉成陣列類型
console.log([...map.keys()]);  // [1, 2]
console.log([...map.values()]);  // ['one', 'two']
```
