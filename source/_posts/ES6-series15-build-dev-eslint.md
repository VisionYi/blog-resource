---
title: ES6 開發環境建置(下) - ESLint 偵錯工具
date: 2018-01-21
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
    - ESLint
    - 偵錯工具
---

在上一篇 [ES6 開發環境建置(上) - Babel 編譯工具](/2018/01/20/ES6-series14-build-dev-babel/) 講解 Babel 後，這篇將來介紹 ESLint ，使用 **ESLint 偵錯工具**來**檢查 JavaScript 靜態程式碼的語法和風格**，讓我們在編譯前可以減少錯誤產生，還能改善程式碼的品質與統一程式碼風格。

<!-- more -->

在使用前可以先建置環境目錄，有需求的請參考上一篇的第一段內容。

## 使用 ESLint 偵錯工具
![ESLint-logo](https://i.imgur.com/0XlkrTV.png)

為了讓 Babel 編譯器能順利執行，避免錯誤的產生，也讓我們有更好的程式碼品質，減少後續維護的成本，[ESLint](https://eslint.org/) 就是個非常適合的偵錯工具使用在 JavaScript 語言上，它也支援 ES6 最新的標準，不過ESLint 的配置規範就比較複雜一些，最好搭配主流的規範套件會比較輕鬆。

### 工具說明
#### `eslint` 工具

- ESLint 本身的工具，內建就可以執行命令行了
- 需要安裝在全域環境下才能使用 `eslint` 命令
- 基本用法如下

```shell
# 初始化建立 .eslintrc 配置檔
eslint --init

# 偵測目標檔案是否有違反規範 (需先建立配置檔)
eslint example.js

# 偵測完若有錯誤，將會自動修復不符規範的地方
babel example.js --fix
```

#### `.eslintrc` 配置檔
- ESLint 的規範內容都會在這裡設置，可自行設定規範需求
- 主要都是使用 JSON 格式，規範內容可參考 [淺入淺出 eslint 與實作-Configuration of ESLint](https://denny.qollie.com/2016/07/11/eslint-fxcking-setup/#Configuration-of-ESLint)
- 基本格式如下

```json
{
  "parser": "",         // 預設解析器
  "parserOptions": {},  // 預設解析器的設定
  "extends": [],        // 可引入其他完整的配置檔
  "plugins": [],        // 可引入第三方套件
  "env": {},            // 設定環境，會有不同的全域變數，像是 browser、node
  "globals": {},        // 可自訂加入全域變數
  "rules": {}           // 可自訂加入規範內容
}
```

### 開始實際建置
**1.** 為了方便使用，在本地端與全域環境中都安裝 `eslint` 工具

```shell
$ npm install eslint -g
$ npm install eslint --save-dev
```

**2.** 在根目錄下初始化，建立`.eslintrc`配置檔

```shell
$ eslint --init
```

**3.** 這裡會先問你要怎麼建立規範檔案呢? 如下 :
- Answer questions about your style
- Use a popular style guide
- Inspect your JavaScript file(s)

通常只會選擇前兩種方式。如果選擇第一項，將會一連串問你基本的規範內容，選擇 JSON 格式，就會直接建立`.eslintrc.json`配置檔。

不過，最常用的還是使用第二項，引入主流的規範配置，順便會再問你想要哪一種主流規範，這裡會使用 "**[Airbnb](https://github.com/airbnb/javascript)**" 為居多，也很適合團隊的規範，點選完後會幫你下載它的專屬配置套件，再幫你建立`.eslintrc.json`配置檔，ESLint 會把這個主流規範自動引入配置檔中。(這裡不選擇把 react 加入)

**4.** `.eslintrc.json`檔案內容如下

```json
{
  "extends": "airbnb-base"
}
```

而在 npm 的`packing.json`配置檔中你會看到多了剛剛下載的套件，代表安裝成功了，如下 :
> "devDependencies": {
>   "eslint": "^4.15.0",
>   "eslint-config-airbnb-base": "^12.1.0",
>   "eslint-plugin-import": "^2.8.0"
> }

**5.** 接下來就可以加入自訂的規範內容，改寫`.eslintrc.json`配置檔
- 這裡舉例: **縮排使用4個空格、允許使用 `console.log()`、加入環境設定 browser**
- `.eslintrc.json`以舉例來說，內容改寫成如下

```json
{
  "extends": "airbnb-base",
  "env": {
    "browser": true
  },
  "rules":{
    "indent": ["error", 4],
    "no-console": "off"
  }
}
```

**6.** 最後就能偵錯檔案了，終端機執行命令如下

```shell
$ eslint src/index.js
```

然後運行後的結果，將會幫你列出不符合規範的地方，若有錯誤，結果類似下圖 :
![運行後結果圖](https://i.imgur.com/1injs6c.png)

以上就是 ESLint 的基本使用，當然自己手動偵錯是很笨的方式，一樣這也可以搭配第三方套件來幫你自動偵錯。

**7.** 搭配**自動化模組工具**或**程式編輯器的插件**
- 自動化模組工具可以使用 Webpack
- 最好還是使用程式編輯器的插件來輔助會比較方便，這裡以 VSCode 編輯器為例
    - 安裝 ESLint 插件如下圖
    - 使用 npm 安裝全域環境`eslint`，再依照步驟建立好`.eslintrc.json`規範後就可以使用啦！

![VSCode 插件 ESLint](https://i.imgur.com/YK16NyK.png)

只要搭配好的工具就能讓你輕鬆偵錯，快速建立環開發境，改善你的 coding style，尤其是在團隊裡更應該要有好的規範習慣。

## 後記
這篇做的有點久阿，原因網路上許多教學都很簡略就帶過了，我想做個完整地操作步驟，至少要知道這些工具是如何被使用，再來搭配其他套件工具也是很重要的。

原本 "**ES6 開發環境建置**" 是打算只用一篇發出，但寫到最後改了很多次，又加深說明，導致內容不知不覺暴增...所以就分為兩篇文章介紹了，希望可以達到最完整的紀錄，清楚知道這些工具在使用上是很方便的啦~
