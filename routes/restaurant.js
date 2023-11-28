const express = require("express");
const router = express.Router();

const models = require("../models");
const Restaurant = models.Restaurant;

router.get("/:id", (req, res) => {
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

module.exports = router;
