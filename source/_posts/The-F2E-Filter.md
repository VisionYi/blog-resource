---
title: The F2E 挑戰之學習筆記 - Filter 高雄旅遊景點
date: 2018-07-24
update: 2018-07-25
categories: 網頁開發
tags:
    - web
    - note
    - CSS/SCSS
    - Vue
    - 樣版設計
keywords:
    - web
    - SCSS
    - 學習筆記
    - 樣版設計
    - The F2E 前端
    - vue
    - vuex
    - vue-router
    - Vuetify
    - Axios
    - 高雄市政府 Open Data
---

這是參與了 **The F2E - 前端修練精神時光屋** 社群活動中的一個挑戰項目: **Filter**。這裡紀錄此專案撰寫時的一些心得與筆記。

## 專案使用的技術
- Vue、Vuex、vue-router
- SCSS
- Axios
- 串接第三方 API (高雄市政府 Open Data)
- Vuetify 基於 vue2.x 的 UI 組件框架

<!-- more -->

## 專案連結
- [Live dome](https://visionyi.github.io/F2E-filter)
- [Source code](https://github.com/VisionYi/F2E-filter)

## 技術開發時遇到的坑 & 筆記內容
### 網頁切版、設計
- img 圖片的 RWD 響應式設計
  - 隨著頁面寬度改變而改變高度
  - 可維持比例 16 : 9
  - 可外框固定大小後讓圖片置中

- 使用 CSS 截斷文字內容，自動限制行數
  - 可搭配 RWD 響應式設計，當寬度減少時，也會自動截斷更多內容
  - 參考: [Line Clampin’ (Truncating Multiple Line Text)](https://css-tricks.com/line-clampin/)
  - 以下為基本配置:

```css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制行數 */
  -webkit-box-orient: vertical;  /* 內容為橫向字，垂直排列下去 */
}
```

### JS 功能 & Vue 的使用
- vue 生命週期 mounted 的使用時機
  - 瀏覽器進行以下階段時，將調用此函數鉤子
    - 當頁面所有 DOM 元素都第一次渲染完成
    - vue 的所有實例資料掛載完成後

  - 在此進行以下操作
    - 執行 ajax 資料請求
    - 執行資料初始化，包含 Vuex store 的 資料狀態
    - 取得 `vm.$refs`、`window`、`document` 之 DOM 元素，執行資料初始化
    - 執行全局的 `window` 監聽事件 scroll, resize 之類的
  - 參考 : [關於 Vue 實例的生命週期 created & mounted 的區別](https://segmentfault.com/a/1190000008570622)

- vue 的動畫 & 元素轉場操作
  - 使用 `<transition>` 標籤

- 執行全局的 `window` 監聽事件時
  - 需特別注意元素是否隨著頁面而改變，包含 vue 綁定的資料與狀態
  - 需要事先初始化有被操作的資料
  - 可在外層封裝一個 debounce 函數，避免資料操作過度頻繁

- vue.directives 的進階使用
  - 使用函數鉤子 `inserted`
  - 當 DOM 元素被綁定與渲染完成後調用 (被 vue 插入節點中時調用)
  - 可用於全局 window 監聽事件來綁定 DOM 元素的操作，參數值可以是函數

- vuex store 資料與 `v-model` 做結合
  - 需要另做一個 computed 類型的資料
  - 使用 computed 的 `get()` 取得 store getters 資料
  - 使用 computed 的 `set()` 執行 store mutations 操作資料
  - 如果是表單的 input text 雙向綁定資料，建議在外層封裝一個 debounce 函數

- `element.offsetTop` 取得的**高度**不一定是元素的頂部到達整個頁面的頂部距離，會依照元素的所在位置而改變


### 資料頁面構想
- 頁面的資料是否會變動，可能會新增或減少呢！？
- 必須事先決定清楚，非常關鍵！會影響後續的資料結構與整合。

