const express = require("express");
const { User } = require("../database/models/user");
const registerValidation = require("../middleware/auth");
const router = express.Router();

router.use("/register", registerValidation);

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const user = new User(email, password);
  user
    .save()
    .then((data) => res.json({ message: "Register Successfully!", data }))
    .catch((err) => res.json(err));
});

module.exports = router;
