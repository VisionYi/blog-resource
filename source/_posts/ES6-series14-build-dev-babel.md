---
title: ES6 開發環境建置(上) - Babel 編譯工具
date: 2018-01-20
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
    - 環境建置
    - build develop
    - Babel
    - 編譯工具
---

已經寫了好幾篇介紹 ES6 特色的文章，這次就來詳細介紹 JavaScript ES6 的開發環境要如何建立吧！由於文章內容有點長，就分為兩篇來討論，此篇主軸為 Babel，下一篇為 ESLint 的重點使用。

現今各大瀏覽器廠商所開發的 JavaScript 引擎還沒有對 ES6 標準中所有特性做到完美支持，不能直接放入，有些新語法會報錯。所以想使用這些新特性或語法在所有瀏覽器上，需要使用 **Babel 編譯器**來**轉換成舊式的 ES5 標準代碼**，才能完全符合環境的支持。

<!-- more -->

## 建置開發目錄
### 建立目錄

為了要簡單快速使用，我們建立以下目錄 :

```shell
目錄
|-- dist
|-- src
     |-- index.js
|-- index.html
```

- dist 資料夾 :
    - 此為 JS 檔案被 Babel 編譯成 ES5 代碼的資料夾，會讓 index.html 引入這裡的檔案
- src 資料夾 :
    - 預設為編寫 JS ES6 檔案的地方
- index.html 內容 :

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ES6 - Build Test</title>
</head>
<body>
    Hello !!
    <div id="text"></div>
    <script src="./dist/index.js"></script>
</body>
</html>
```

- src / index.js 內容 (簡單的 ES6 語法):

```javascript
const getText = () => 'JavaScript ES6';

document.getElementById('text').innerHTML = getText();
```

### 前置作業
在使用 Babel、ESLint 之前要先會用 **npm 套件管理**來安裝，這是在 Node.js 環境下執行的，不懂得可以先去 [npm 官網](https://www.npmjs.com/) 看看。

- 在根目錄下指令 - 初始化 npm :

```shell
$ npm init
```

- 默認設定值就好，它在根目錄下會產生一個`package.json`檔案:

```json
{
  "name": "es6-buildtest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

- 之後安裝的套件 Babel、ESLint 的所有工具都會在這個檔案中顯示出來，可以好方便管理

## 使用 Babel 編譯工具
![Babel-logo](https://i.imgur.com/afpxrCa.png)

[Babel](https://babeljs.io/) 是 JavaScript 的編譯器(compiler)工具，可以把 ES6 標準以上的新語法轉換成最基本的 JS 語法，另外也支援 react 語法轉換，只要簡單的配置就能完成，這已是現今非常流行的轉換工具了。Babel 搭配一些自動化打包套件還可以加快效率與自動運行，在前端工程中很受歡迎。

### 工具說明
#### `.babelrc` 配置檔案
- 使用 Babel 的第一步就是建立此檔案，會存放在根目錄下
- 這是用來設置 Babel 的轉碼規則和插件
- 基本格式如下

```json
{
  "presets": [],
  "plugins": []
}
```

#### `babel-preset-env` 工具
- Babel 提供的轉碼規則包
- 這是包含最新的 es2015 ~ es2017 版的規則集內容，請參考 [preset-env](https://babeljs.io/docs/plugins/preset-env/)

#### `babel-cli` 工具

- Babel 提供的工具，可以執行指令行來進行轉碼
- 需要安裝在全域環境下才能使用 `babel` 命令
- 基本用法如下

```shell
# 轉碼後输出到畫面上
babel example.js

# 轉碼後寫入一個檔案中
babel example.js -o compiled.js

# 將整個目錄轉碼到輸出的目錄裡
babel src -d dist
```

- 但全域環境下無法跟著本地專案的版本走，所以等等實際建置時會使用本地端安裝來進行

### 開始實際建置
**1.** 先在本地端安裝 `babel-cli`、`babel-preset-env` 工具 :

```shell
$ npm install babel-cli babel-preset-env --save-dev
```

**2.** 這時候會在 package.json 檔案中看到多出`devDependencies`選項，代表安裝成功
> "devDependencies": {
>    "babel-cli": "^6.26.0",
>    "babel-preset-env": "^1.6.1"
> }

**3.** 再來建立`.babelrc` Babel 的配置檔案，把轉碼規則包的套件填入，檔案內容如下

```json
{
  "presets": ["env"]
}
```

**4.** 然後藉由 npm 的腳本自訂方式來代替 babel 命令，改寫 package.json 中`scripts`選項，內容如下
>"scripts": {
>  "build": "babel src -d dist"
>}

**5.** 最後在終端機執行命令如下

```shell
$ npm run build
```

可以看到運行的結果，dist 資料夾裡多了一個 index.js 檔如下

```javascript
'use strict';

var getText = function getText() {
  return 'JavaScript ES6';
};

document.getElementById('text').innerHTML = getText();
```

這就代表編譯成 ES5 代碼成功啦！執行 index.html 在瀏覽器上看看是否會有預期的結果吧~

以上是 Babel 的基本使用，需要自己手動執行編譯的命令，由於很麻煩就有了第三方套件站出來了，自動化這些命令程序，接下來一節，我們使用另一個方法來讓它更方便。

### 使用第三方套件 Gulp 運行 Babel 功能
[Gulp](https://gulpjs.com/) 是現今很流行的**任務打包工具**，主要用來自動化運行任務套件，像是編譯、最小化、合併...等等的任務。Gulp 的詳細教學就請先自行 google 吧，這裡將省略帶過。

#### 使用 Gulp 開始建置
**1.** 需要先安裝`gulp`與 Babel 提供的`gulp-babel`、`babel-core`、`babel-preset-env`這三套工具 :

```shell
$ npm install gulp gulp-babel babel-core babel-preset-env --save-dev
```

**2.** 還是要建立 `.babelrc` 檔案 :

```json
{
  "presets": ["env"]
}
```

**3.** 然後建立 Gulp 需要運行的腳本檔案 `gulpfile.js`，放在根目錄下，**內容為把 src 資料夾裡的檔案進行編譯後再放到 dist 資料夾中**(可直接使用部分的 ES6 語法) :

```javascript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>
    gulp.src('src/**')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
);
```

**4.** 最後在終端機執行腳本命令，如下

```shell
$ gulp build
```

對！ 你可以發現到，以上方法跟直接使用 `babel-cli` 命令行工具是一樣的效果。雖然它比較繁瑣，但別忘了 Gulp 的主要功能是**自動化任務**，繼續下面操作。

**5.** 我們另外在 `gulpfile.js` 檔案中再加入**自動化監看腳本**的程式碼，如下 :

```javascript
gulp.task('watch', () => {
    gulp.watch('src/**', ['build']);
});
```

**6.** 使用監看腳本，終端機執行命令如下

```shell
$ gulp watch
```

當運行後，**可以看到只要每次修改 src 資料夾裡的 JS 檔案，Gulp 將會自動執行 Babel 編譯動作**，至少這樣就方便許多了。若搭配它的一些 API 還能與其他套件做結合呢！

下一篇文章[ES6 開發環境建置(下) - ESLint 偵錯工具](/2018/01/21/ES6-series15-build-dev-eslint/) 將會介紹 ESLint 偵錯工具，可以在編譯前找出錯誤，規範好統一的程式碼風格。
