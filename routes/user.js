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
    const { email, id } = req.body;
    if (email) {
      User.deleteUserByEmail(email)
        .then((data) => res.json({ success: true, data }))
        .catch((err) =>
          res
            .status(404)
            .json({ message: `user with email: ${email} is not found!` })
        );
    } else if (id) {
      User.deleteUserById(id)
        .then((data) => res.json({ success: true, data }))
        .catch((err) =>
          res.status(404).json({ message: `user with given id is not found!` })
        );
    } else {
      User.deleteAll()
        .then((data) => res.json({ success: true, data }))
        .catch((err) => res.json(err));
    }
  });

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  User.getUserById(id)
    .then((data) => {
      if (data) {
        res.json({ success: true, data });
      } else {
        res.status(404).json({ message: `user with given id is not found!` });
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;
