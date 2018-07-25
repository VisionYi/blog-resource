---
title: The F2E 挑戰之學習筆記 - Product Gallery
date: 2018-07-04
update: 2018-07-05
categories: 網頁開發
tags:
    - web
    - note
    - CSS/SCSS
    - 樣版設計
keywords:
    - web
    - CSS Grid
    - SCSS
    - 學習筆記
    - 樣版設計
    - The F2E 前端
    - Parcel
---

這是參與了 ‎**The F2E - 前端修練精神時光屋** 社群活動中的一個挑戰項目: **Product Gallery**。這裡紀錄此專案撰寫時的一些心得與筆記。

## 專案使用的技術
- CSS Grid
- SCSS
- Pracel 零配置極速打包工具

<!-- more -->

## 專案連結
- [Live dome](https://visionyi.github.io/F2E-product-gallery/)
- [Source code](https://github.com/VisionYi/F2E-product-gallery)

## 專案開發時遇到的坑 & 筆記內容
### Parcel
- 當多個 HTML 頁面時，需要在各自的 HTML 裡直接引入 css/scss/less, js/jsx 檔案

- 由於 dist 和 .cache 在建置後或開啟 server 時，不會把原先的檔案刪除，需要事先手動刪除
  - 在執行命令前可以先下 `rm -rf dist && rm -rf .cache` 清除原先的檔案

- 當不同的檔案在同個時間下，加載到同一個需要被編譯的檔案時，就會出現 bug
  - 例如: 本專案在觀看 product.html 時，更改 scss 檔案儲存就會有 Error，等待官方修復

### CSS Grid
- 教學指南參考: [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/#prop-grid-area)

- Gird 父元素主要使用以下 CSS 屬性 (常用)
  - `grid-template` (`-columns` & `-rows`) - 指定網格的長寬數值與數量
  - `grid-gap` - 設定間距大小
  - `grid-auto-rows` - 指定剩餘的 row 長度，在內容不明確時可用
  - `align-items` - 上下對齊
  - `justify-content` - 全體左右對齊或分散

- Gird 子元素主要使用以下 CSS 屬性 (常用)
  - `grid-column` & `grid-row` - 指定範圍或明確座標
    - 內容值為 `開始位置 / 結束位置`
  - `grid-area` - 上面屬性的合體
    - 內容值為 `col 開始 / row 開始 / col 結束 / row 結束`
  - `align-self` & `justify-self` - 上下對齊 & 左右對齊

- 當子元素要指定放置的範圍時，可以使用以下撰寫方式:
  - `grid-column: x / span n格數;` + `grid-row: y / span n格數;`
  - `grid-area: x / y / span n格數 / span n格數;`
  - 單獨使元素靠上下或左右對齊的 CSS 屬性為:
    - `align-self` & `justify-self`

- 當父元素 `grid-template-columns` 在指定欄位寬度的實際數值後，不代表全部加總後就是實際的 `width` 長度，`width` 還是 auto
  - 由於 `width` 沒有真的數值，所以使用 margin 左右等於 auto 時是不會置中的
  - 不依賴 `width` 時，可使用 `justify-content: center;` 就能置中

### 其他 CSS/SCSS 技巧
- 使圖片只顯示局部區域，常用於只取中間固定長寬的位置，超過長寬的都隱藏起來
  - 為 img 標籤加上一個外層元素
    - CSS 屬性加上 `overflow: hidden;`，超過就隱藏
    - 原本是指定 img 標籤的長寬大小，現在則改為指定此層元素的大小，而 img 設置為 `width: 100%` 就可以了
  - 外層元素再使用 flex 垂直置中的方式
  - 或是 img 使用 [translateY(-50%)](https://stackoverflow.com/questions/40530101/why-is-translatey-50-needed-to-center-an-element-which-is-at-top-50) 垂直置中的方式
