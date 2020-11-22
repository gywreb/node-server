const express = require("express");
const { User } = require("../database/models/user");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    User.getAll()
      .then((data) => res.json({ success: true, users: data }))
      .catch((err) => res.json(err));
  })
  .delete((req, res) => {
    User.deleteAll()
      .then((data) => res.json({ success: true, data }))
      .catch((err) => res.json(err));
  });

module.exports = router;
