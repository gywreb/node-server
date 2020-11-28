const express = require("express");
const { Review } = require("../database/models/review");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const data = await Review.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
