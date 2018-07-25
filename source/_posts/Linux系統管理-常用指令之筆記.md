---
title: Linux系統管理-常用指令之筆記
date: 2017-04-19
update: 2017-05-16
coverImage: https://i.imgur.com/zvHzbR6.jpg
coverSize: partial
thumbnailImagePosition: right
categories: Linux相關
tags:
    - Linux
    - note
    - 指令
keywords:
    - Linux
    - ubuntu
    - 系統管理
    - 常用指令
    - 使用者與群組
---

為了熟悉 Linux 系統的基本技巧，學習記錄一些下指令的操作，內容真的非常多。以下紀錄了關於操作**使用者帳號、群組、目錄、檔案...**等等的常用指令，內容有簡化過了，方便查詢使用，請善用`Ctrl + F`搜尋關鍵詞。

<!-- more -->
<!-- toc -->

## 快捷鍵

- `shift + pageup`
    - 顯示超出畫面可以往上移動，類似上滾輪
- `shift + pagedown`
    - 顯示超出畫面可以往下移動，類似下滾輪
- `ctrl + d`
    - 登出現在的使用者或直接離開，等於指令`exit`
- `ctrl + z`
    - 暫停程序，並將程序放置背景
- `\ + enter`
    - 使指令連續到下一行

## 常用指令

### 基礎

- <mark>date</mark>: 顯示日期與時間
    - `date [+%Y/%m/%d %H:%M]`
- <mark>cal</mark>: 顯示日曆
    - `cal [month] [year]`
- <mark>bc</mark>: 簡單好用的計算機

### 改變檔案或目錄的屬性、權限

- <mark>chgrp</mark>: 改變檔案所屬群組
    - `chgrp [-R] 群組名稱 檔案或目錄`
    - -R 遞迴改變整個目錄裡的所有檔案(包含目錄本身)

- <mark>chown</mark>: 改變檔案擁有者
    - `chown [-R] 帳號名稱 檔案或目錄`
    - `chown [-R] 帳號名稱:群組名稱 檔案或目錄`

- <mark>chmod</mark>: 改變檔案的權限, SUID, SGID, Sticky bit等等的特性
    - `chmod [-R] 數字或文字表示 檔案或目錄`
    - 每個檔案一定都會有 user、group、other 的所屬權限
    - 每個所屬權限在一般情況下都有 read(可讀)、write(可寫)、execute(可執行) 的權限可設定
    - 數字表示可以是3位數或4位數
        - 一般: <mark>r</mark>=4, <mark>w</mark>=2, <mark>x</mark>=1
        - 特殊: <mark>SUID</mark>=4, <mark>SGID</mark>=2, <mark>Sticky bit</mark>=1
        - 範例: `chmod 754 name` => user: r+w+x, group: r+x, other: r
        - 範例: `chmod 4754 name` => 這裡多了的第一個數字為加上特殊權限SUID
    - 文字表示
        - `u` `g` `o` `a`(全部)
        - `+` `-` `=`
        - `r` `w` `x` `s` `t`
        - 以`,`隔開
        - 範例: `chmod u+rwx,g-x,o=r name`
        - 範例: `chmod u+s,g+s name` => 此檔案加上SUID與SGID的權限

- <mark>umask</mark>: 查看或修改檔案預設權限
    - `umask [-S]` => 此為查看
    - `umask [數字表示]` => 此為修改
    - -S 以文字表示顯示當時預設的權限
    - 若是數字表示顯示的方式，表示為 **被拿掉的權限**
    - 範例: 022 => 表示 group 與 other 都預設拿掉寫入(wirte)的權限

### 檔案與目錄的管理(新增.刪除.修改.移動)

| 指令       | 使用對象 | 說明  | 使用方法 | 註備   |
| --------- | ------- | ---- | ------ | ------ |
| <mark>mkdir</mark> | dir | 建立新目錄 | `mkdir [-mp] 目錄` | -m 加入權限,後面接代號<br> -p 遞迴建立目錄 |
| <mark>rmdir</mark> | dir | 刪除空目錄 | `rmdir [-p] 目錄` | -p 遞迴刪除目錄<br> 目錄下必須為空才能刪 |
| <mark>cp</mark>    | file/dir| 複製檔案或目錄 | `cp [-ari] 來源檔 目標檔` | -a 使資料特性完全一樣<br> -r 遞迴複製整個目錄<br> -i 會先詢問動作 |
| <mark>rm</mark>    | file/dir| 刪除檔案或目錄 | `rm [-rfi] 檔案或目錄` | -r 遞迴刪除整個目錄<br> -f 強制刪除，忽略不存在的項目<br> -i 會先詢問動作 |
| <mark>mv</mark>    | file/dir| 移動檔案與目錄 | `mv [-fiu] 來源檔 目標檔` | -f 強制覆蓋已存在的檔案<br> -i 會先詢問動作<br> -u檔案已存在較舊才覆蓋 |
| <mark>mv</mark>    | file/dir| 更改名稱 | `mv 原始名稱 更改名稱` | 有類似的指令rename |
| <mark>touch</mark> | file | 建立空檔案 | `touch 檔案 ` | 另個功能是更改日期 |


- <mark>touch</mark>: 更改檔案日期
    - `touch [-amt] [YYMMDDhhmm] 檔案`
    - -a 僅修訂 atime；
    - -m 僅修改 mtime；
    - -t atime與mtime都會被修改
    - 範例: `touch -t 201704011200 name` => 將檔案時間更改為 2017/04/01 12:00

### 檔案內容查閱

| 指令      | 說明  | 常用方式 |
| -------- | ---- | ------- |
| <mark>cat</mark>  | 從第一行開始顯示  | `cat [-n] name` 列印出行號，連同空白行也會有行號;<br> `cat [-A] name` 可列出一些特殊字符 |
| <mark>tac</mark>  | 從最後一行開始顯示| `tac name` |
| <mark>less</mark> | 一頁一頁的方式顯示| `less name` |
| <mark>head</mark> | 只看頭幾行       | `head -n 20 name` |
| <mark>tail</mark> | 只看尾幾行       | `tail -n 5 name` |

### 搜尋相關

- <mark>which</mark>: 指令檔名的搜尋 (預設只會顯示找到的第一個)
    - `which [-a] 指令名稱`
    - -a 列出找到的所有檔案路徑名

- <mark>whereis</mark>: 特定檔案的搜尋 (以資料庫的索引來搜尋)
    - `whereis 搜尋字串`
    - 通常只會去系統的目錄下搜尋檔案或目錄

- <mark>locate</mark>: 檔案名稱的搜尋 (以資料庫的索引來搜尋)
    - `locate [-lir] 搜尋字串`
    - -l 只可以輸出幾行的意思
    - -i 忽略大小寫的差異
    - -r 後面接正規表示法
    - 查詢速度非常快
    - 在使用 `locate 搜尋字串` 之前，請先下指令 `updatedb` ，用於更新資料庫，可以避免剛新增的檔案無法被搜尋到
    - Linux 每天會自動更新一次資料庫

- <mark>find</mark>: 檔案名稱、使用者、群組名稱...等等的搜尋
    - `find [PATH] [option] [action]`
    - 一般帳號與root帳號顯示出來的會不一樣
    - 查詢速度很慢，盡量少用
    - 範例: `find / -name 檔案或目錄名稱`
    - 範例: `find / -group 群組名稱`

- <mark>grep</mark>: 在指定的檔案內容中進行文字搜索
    - `grep 搜尋字串 檔案1 檔案2...`
    - 可以一次搜索多個檔案

### 其他

- <mark>pwd</mark>: 顯示目前的目錄
    - `pwd [-P]`
    - -P 顯示出確實的路徑，而非使用連結 (link) 路徑

- <mark>cd</mark>: 變換目錄
    - `cd [相對路徑或絕對路徑]`

- <mark>ls</mark>: 檔案與目錄的檢視
    - `ls [-adlt] 檔名或目錄`
    - `ls [--full-time] 檔名或目錄`
    - -a 全部的檔案，連同隱藏檔一起列出來
    - -d 僅列出目錄本身，而不是列出目錄內的檔案資料
    - -l 長資料串列出，包含檔案的屬性與權限
    - -t 以時間作為排序(預設為檔案名稱做排序)
    - --full-time 以完整時間模式(包含年、月、日、時、分)輸出
    - 可使用簡化指令 `ll` 等於 `ls -al` (常用)

## 使用者與群組管理之相關指令

### 使用者操作

- <mark>useradd</mark>: 新增使用者
    - `useradd [-u UID] [-g 初始群組] [-G 次要群組] [-c 說明欄] [-d 家目錄絕對路徑] 帳號名`

- <mark>passwd</mark>: 設定使用者密碼
    - `passwd [-luS] 帳號名`
    - -l 封鎖此帳號，會將 /etc/shadow 第二欄最前面加上！使密碼失效
    - -u 解鎖此帳號
    - -S 檢測是否為被封鎖

- <mark>chage</mark>: 顯示詳細的密碼參數
    - `chage [-l] 帳號名`
    - -l 列出該帳號的詳細密碼參數

- <mark>usermod</mark>: 變更使用者帳號
    - `usermod [-u UID] [-g 初始群組] [-G 次要群組] [-c 說明欄] [-d 家目錄絕對路徑] 帳號名`
    - `usermod [-LU] 帳號名`
    - -L 封鎖此帳號，會將 /etc/shadow 第二欄最前面加上！使密碼失效
    - -U 解鎖此帳號

- <mark>userdel</mark>: 刪除使用者帳戶與其相關的檔案
    - `userdel [-r] 帳號名`
    - -r 連同使用者的家目錄也一起刪除

- <mark>id</mark>: 查詢帳號或自己的相關 UID/GID 等等的資訊
    - `id [帳號名]`

### 群組操作

- <mark>groupadd</mark>: 建立群組
    - `groupadd [-g GID] 群組名`

- <mark>groupmod</mark>: 變更群組
    - `groupmod [-g GID] [-n 修改群組名稱] 群組名`

- <mark>groupdel</mark>: 刪除群組
    - `groupdel 群組名`
    - 在刪除之前，必須要確認 /etc/passwd 內的帳號沒有任何人使用該群組作為 初始群組
    - 再刪除之前可使用 `find / -group 群組名` 檢查

- <mark>gpasswd</mark>: 群組管理員功能
    - 只有root能做的指令: `gpasswd 群組名`
    - 只有root能做的指令: `gpasswd [-A 帳號1] [-M 帳號2,...] 群組名`
    - 只有root能做的指令: `gpasswd [-rR] 群組名`
    - 若沒有任何參數時，則是給予該群組一個密碼
    - -A 將此群組的主控權交給指定帳號(群組管理員)
    - -M 將帳號加入該群組當中
    - -r 將此群組的密碼移除
    - -R 讓此群組的密碼欄失效
    - 群組管理員與root能做的指令: `gpasswd [-ad] 帳號 群組名`
    - -a 將帳號加入該群組當中
    - -d 將帳號從該群組當中移除

- <mark>groups</mark>: 有效與支援群組的觀察
    - `groups`
    - 第一個顯示的群組為有效群組

- <mark>newgrp</mark>: 有效群組的切換
    - `newgrp 群組名`
    - 切換後會進入新的環境，使用指令 `exit` 切換回原來的有效群組

---

參考:
> 如果有興趣的朋友想要更詳細瞭解指令怎麼用的
> 請詳見[《鳥哥的 Linux 私房菜》](http://linux.vbird.org/linux_basic/0320bash.php)，裡面有更多知識等你去尋找囉！
