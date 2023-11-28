const express = require("express");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const models = require("./models");
const Restaurant = models.Restaurant;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  // qurey.keyword 對應 index.hbs <input ... name="keyword" ；?.為可選串連(Optional chaining)
  const keyword = req.query.keyword?.trim();
  (async () => {
    try {
      const restaurants = await Restaurant.findAll({ raw: true });
      const matchedRestaurants = keyword
        ? restaurants.filter((restaurant) =>
            Object.values(restaurant).some((property) => {
              if (typeof property === "string") {
                return property.toLowerCase().includes(keyword.toLowerCase());
              }
              return false;
            })
          )
        : restaurants;
      res.render("index", { restaurants: matchedRestaurants, keyword });
    } catch {
      res.status(422).json(err);
    }
  })();
});

app.get("/restaurant/:id", (req, res) => {
  const { id } = req.params;
  (async () => {
    try {
      const restaurant = await Restaurant.findByPk(id, { raw: true });
      res.render("show", { restaurant });
    } catch {
      res.status(422).json(err);
    }
  })();
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
