const express = require("express");
const { Course } = require("../database/models/course");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const data = await Course.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
