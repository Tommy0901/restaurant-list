const express = require("express");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const router = require('./routes')

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(router); // 將 request 導入路由器

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
