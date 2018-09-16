---
title: Vue Learning 學習筆記 (已結束更新)
date: 2018-03-05
update: 2018-08-01
categories: 網頁開發
tags:
    - web
    - note
    - Vue
keywords:
    - web
    - 學習筆記
    - vue
    - vuex
    - vue-router
    - Axios
---

這是從今年 3 月初開始學習 Vue 的相關技術到現在，目前已更新結束。

體驗的過程中採了不少坑，嘗試導入各個專案中，希望可以建立更完整的 SPA 網站，因此記錄的一些心得內容都放在這裡了，提供未來的自己可以更快速地開發專案，運用 Vue 建立更完善與維護性高的網頁服務。

> Update date: 2018-07-26

<!-- more -->

### 主要學習的技術領域
- Vue v2.x
- vue-cli v3.x 環境建置手腳架
- vue-router 前端路由操作
- vuex + axios 狀態與共用資料的管理 + 處理 HTTP 請求服務
- Vuetify UI 組件框架

### vue 生命週期 mounted 的使用時機
- 瀏覽器進行以下階段時，將調用此函數鉤子
  - 當頁面所有 DOM 元素都第一次渲染完成
  - vue 的所有實例資料掛載完成後

- 在此進行以下操作
  - 執行 ajax 資料請求
  - 執行資料初始化，包含 Vuex store 的 資料狀態
  - 取得 `vm.$refs`、`window`、`document` 之 DOM 元素，執行資料初始化
  - 執行全局的 `window` 監聽事件 scroll, resize 之類的

- 參考 : [關於 Vue 實例的生命週期 created & mounted 的區別](https://segmentfault.com/a/1190000008570622)

### src 中的目錄架構，另外加上 3 個資料夾
- api 目錄: 後端 api 的實作或反向校驗後端 api 的方法
- service 目錄: 處理後端 api 請求後的 Data，整合後再統一給 store
- shared / util 目錄: 一些共用的 library、自製的函數方法、常數設定...等等
- 參考: [Vue 項目架構設計與工程化實踐](https://github.com/berwin/Blog/issues/14)

### Vue Components 組件
- 將所有的 components 集中導向到同一個 index.js 接口
- 之後再到 src/main.js 一起輸出成 `Vue.component(key, value)`，這樣所有的 view 就能直接引用了

### 輔助工具
- 使用 [browser-sync](https://browsersync.io/) 做一個簡易的 server，把已建置完成的 dist 靜態檔案放上去
- 使用 [json-server](https://github.com/typicode/json-server) 建構後端 REST API，將資料庫建在記憶體中的方法
- 使用 [gh-pages - npm](https://www.npmjs.com/package/gh-pages) 佈署發布到 Github Page 上

### 把 axios api 封裝成 request.js
- 可加入額外的設定條件
- 可事先攔截 request 的內容，加入 Authentication 或限制條件之類的，再傳給後端
- 可事先攔截 response 的內容，做一些資料的邏輯修改再回傳
- 可事先統一處理 error 事件的產生，例: 發出錯誤訊息、轉跳網址之類的
- 可以把 data 改成 **POST 表單形式**再傳給後端
  - 參考: [axios發送post請求，如何提交表單數據](https://segmentfault.com/q/1010000008462977)
- 參考: [Axios 封裝(報錯,鑑權,跳轉,攔截,提示)](https://xiaozhuanlan.com/topic/8295076341)

### vuex store 使用技巧
- 哪時候可以使用
  - 不同的組件或 view 需要**共用的資料或狀態**時可用
  - **最主要串接 API 的資料**請一定要放入，不時就可能會出現相關聯的狀態或資料參考的~
  - 不想隨著切換頁面一直重載的**大筆數的資料**
  - 統一管理資料用也行

- mutations 的使用時機
  - **操作單一的資料內容時**
  - set、add (`arr.push()`)、update、delete 之類的操作

- actions 的使用時機
  - **處理資料的商業邏輯時**
  - **處理非同步事件**

- store 撰寫思考順序
  - state ---> getters ---> mutations (set) --->  actions ---> mutations (add, update, delete)

- 修改資料狀態的 JS 使用方式 (為了讓 vue 能夠檢測到更新 DOM)
  - 陣列新增項目：
    - `arr.push(newItem)`
    - `arr.push({ props: value })`
  - 陣列修改項目：
    - `arr.splice(index, 1, newItem)`
    - `arr.splice(arr.indexOf(oldItem), 1, { ...oldItem, props: value })`
    - ```javascript
        const index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1, { ...arr[index], props: value });
      ```
  - 陣列刪除項目：
    - `arr.splice(index, 1)`
    - `arr.splice(arr.indexOf(oldItem), 1)`
    - ```javascript
        const index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1);
      ```
  - 物件新增 / 修改屬性內容：
    - `obj = {...obj, props: value}`
  - 物件新增 / 修改多個屬性內容：
    - `obj = {...obj, ...objData}`
    - `obj = {...obj, ...{ p1: v1, p2: v2 } }`

- 可使用 vuex modules 系統，其中參數 namespaced 設置為 true，就能把資料做成模組分類

### vue.directives 的使用時機
- 函數鉤子 `bind` :
  - 當指令被綁定到 DOM 元素時調用，初始化設置用
  - 基本上使用以下 `inserted` 函數鉤子來代替使用就行了

- 函數鉤子 `inserted` :
  - 當 DOM 元素被綁定與渲染完成後調用 (被 vue 插入節點中時調用)
  - 可用於全局 window 監聽事件來綁定 DOM 元素的操作，參數值可以是函數

- 函數鉤子 `unbind` :
  - 當 DOM 元素被 vue 從節點中移除時調用

- 函數鉤子 `update` :
  - 當所在的組件任一 DOM 元素更新渲染時會調用
  - 如果想要**隨著 資料(Data) 或 狀態(status) 的變化去更新 DOM 元素時**，這就非常好用
  - 由於 `binding.value` 沒變動有時也會執行，可以通過比較 `binding.oldValue` 來過濾不必要的更新執行

- 缺點 :
  - ~~無法使用 `this` (vue 實例)，所有的 data 都只能從參數值傳進來，所取得的參數除了 el 其他都只能是唯讀的~~，*請看進階用法*

- 進階用法:
  - 參數值可以是一個函數，使用 directive 取得的值帶入此函數方法，類似閉包方式，此函數內就能使用 `this` (vue 實例)了

### vue 的動畫 & 元素轉場操作
  - 使用 `<transition>` 標籤
  - 加上 appear 屬性可以在初始化渲染後馬上執行動畫效果

### 登入系統概念
- 加上 Token 認證機制

- 需要使用 localStorage 或 cookies 儲存 token，可讓其他子網域自動認證/自動登入，也可以加入 expire 過期機制

- 可以創建 auth.js 專門處理 登入、登出、註冊 的邏輯概念

- 完整實踐概念:
  1. 前端 component - 處理畫面的狀態與資料顯示
      - loading 狀態
      - response message 顯示
      - 成功後觸發 url 轉跳
  2. 前端 vuex store - 處理元件之間的共用資料與暫存資料
      - 獲取 user 基本資料
      - 獲取 token、登入或登出時間
      - 使用 localStorage 或 cookies 暫存
      - 抓取第三方 api 服務的資料
      - 敏感資料處理/編碼
  3. 後端 - 操作資料庫的邏輯與處理驗證資料
      - 查詢 user 是否存在
      - 修改登入或登出狀態、時間、身分...等等
      - 驗證 token、敏感資料解碼
      - 回傳是否成功，回傳資料: result data 或 failure message
  4. 前端 router - 判斷使 url 轉跳為登入頁面
      - 當敏感頁面需要登入驗證時轉跳
      - 當發現登入 token 過期時轉跳

### vue-router
- 改成動態加載的方式，避免名稱或邏輯衝突

### sass/scss 撰寫
- 如果是使用 vue-cli v3.x 建置初始的樣版
- 可以配置全局的 SCSS 自動載入，在 vue.config.js 檔案中配置如下

```javascript
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 自動載入常用的檔案，例: 全局變數、常用函數
        data: '@import "@/your_path/_variables.scss"; @import "@/your_path/_mixins.scss";',
      },
    },
  },
};
```
