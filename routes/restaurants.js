const express = require("express");
const router = express.Router();

const models = require("../models");
const Restaurant = models.Restaurant;

router.get("/", (req, res) => {
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
      res.render("restaurants", { restaurants: matchedRestaurants, keyword });
    } catch (error) {
      res.send("Server Error :(");
    }
  })();
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res, next) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;
  (async () => {
    try {
      await Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description });
      req.flash("success", "create successful !");
      res.redirect("restaurants");
    } catch (error) {
      error.error_msg = "failed to create :(";
      next(error);
    }
  })();
});

module.exports = router;
