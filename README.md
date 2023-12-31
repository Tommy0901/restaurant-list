# 我的餐廳清單

![Index page about Restaurant List](./public/image/snapshot.png)

## 介紹

紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

### 功能

- 使用者可以查看所有餐廳
- 使用者可以瀏覽餐廳的詳細資訊
- 提供圖示連結餐廳地址到 Google 地圖
- 使用者可以搜尋特定餐廳
- 使用者可以新增一家餐廳
- 使用者可以刪除一家餐廳
- 使用者可以修改餐廳的資訊

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

4. 完成資料庫設定，輸入：

   ```bash
   npm run dbsetup
   ```

5. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   ```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

7. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 20.5.1
- Express 4.18.2
- Express-Handlebars 7.1.2
- Express-Session 1.17.3
- Mysql2 3.6.5
- Sequelize 6.35.1
- Sequelize-cli 6.6.2
- Method-Override 3.0.0"
- Bootstrap 5.1.3
- Font-Awesome 6.4.2
- Connect-Flash 0.1.1
