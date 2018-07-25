---
title: Youtube影片、Google Map地圖之響應式網頁設計(RWD)
date: 2017-03-12
update: 2017-03-21
categories: 網頁開發
tags:
    - web
    - CSS/SCSS
    - RWD
keywords:
    - web
    - CSS
    - RWD
    - Youtube影片
    - Google Map地圖
    - 響應式網頁設計
---

鹹魚我最近做網頁增加了許多放入 youtube 影片的需求，當然複製個影片網址再嵌入 iframe 元素裡，設個高與寬、youtube 一些參數，基本上就能輕易搞定了，但我們需要支援 RWD 時，你一定會發現就算寬改成比例，高度也無法跟著變阿！該如何讓它自動縮放比例呢？
<!-- more -->

假設我們原來的影片在 HTML 的格式如下(拿音樂 MV 當範例)：

``` html
<iframe width="450" height="253" src="https://www.youtube.com/embed/L0MK7qz13bU" frameborder="0" allowfullscreen></iframe>
```

<iframe width="450" height="253" src="https://www.youtube.com/embed/L0MK7qz13bU" frameborder="0" allowfullscreen></iframe>

把上面代碼插入網頁裡，到了手機版一定跑版的，所以我們必須加入其他元素，利用 CSS 修正不同瀏覽器的顯示與 ifram 嵌入的技巧，達到 RWD 自動縮放的效果。我們在 iframe 的外層加入一段 CSS 類別的元素，修改 iframe 的 CSS 參數變成可以浮動的，包裹 youtube 影片再拿掉寬與高的參數，以 16：9 比例為例如下：

{% tabbed_codeblock youtube 影片之 RWD 框架 (demo網址) https://jsfiddle.net/visionyi/6sz6ujso/12/ %}
    <!-- tab css -->
        .responsive-16by9 {
            display: block;
            position: relative;
            height: 0;
            overflow: hidden;
            padding: 0;
            padding-bottom: 56.25%;
        }
        .responsive-16by9 iframe {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
        }
    <!-- endtab -->
    <!-- tab html -->
        <div class="responsive-16by9">
            <iframe src="https://www.youtube.com/embed/L0MK7qz13bU" frameborder="0" allowfullscreen></iframe>
        </div>
    <!-- endtab -->
{% endtabbed_codeblock %}

那個 <mark>padding-bottom: 56.25%;</mark> 是 9 除以 16 的寬高比例的。
所以要做成 4：3 比例的就改成 <mark>padding-bottom: 75%;</mark>。

另外 Google map 地圖的使用也是同樣概念，都可以利用修改 CSS 的方式去達到效果。

```html
<div class="responsive-16by9">
    <!-- google map 的 iframe 標籤之內容  -->
</div>
```

---

#### 參考資料

[Fluid Width Video](https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php)
