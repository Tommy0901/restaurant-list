const express = require("express");
const router = express.Router();

const models = require("../models");
const Restaurant = models.Restaurant;

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  (async () => {
    try {
      const restaurant = await Restaurant.findByPk(id, { raw: true });
      res.render("restaurant", { restaurant });
    } catch (error) {
      error.error_msg = "data not found :(";
      next(error);
    }
  })();
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  (async () => {
    try {
      const restaurant = await Restaurant.findByPk(id, { raw: true });
      const category = restaurant.category
      res.render("edit", { restaurant, category });
    } catch (error) {
      error.error_msg = "data not found :(";
      next(error);
    }
  })();
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body;
  (async () => {
    try {
      await Restaurant.update(
        { name, name_en, category, image, location, phone, google_map, rating, description },
        { where: { id } }
      );
      req.flash("success", "update successful !");
      res.redirect(`/restaurant/${id}`);
    } catch (error) {
      error.error_msg = "update failed :(";
      next(error);
    }
  })();
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  (async () => {
    try {
      await Restaurant.destroy({ where: { id } });
      req.flash("success", "delete successful !");
      res.redirect("/restaurants");
    } catch (error) {
      error.error_msg = "delete failed :(";
      next(error);
    }
  })();
});

module.exports = router;
