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
      res.render("index", { restaurants: matchedRestaurants, keyword });
    } catch {
      res.status(422).json(err);
    }
  })();
});

module.exports = router;