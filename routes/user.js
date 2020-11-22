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
      User.getUserByEmail(email)
        .then((data) => {
          if (data) {
            User.deleteUserByEmail(email);
            res.json({ success: true, data });
          } else
            res
              .status(404)
              .json({ message: `user with email: ${email} is not found!` });
        })
        .catch((err) => {
          throw err;
        });
    } else if (id) {
      User.getUserById(id)
        .then((data) => {
          if (data) {
            User.deleteUserById(id);
            res.json({ success: true, data });
          } else {
            res
              .status(404)
              .json({ message: `user with id: ${id} is not found!` });
          }
        })
        .catch((err) => {
          throw err;
        });
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
        res.status(404).json({ message: `user with id: ${id} is not found!` });
      }
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
