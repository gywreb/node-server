const express = require("express");
const { User } = require("../database/models/user");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    const { name, age, isActive, id, balance } = req.query;
    if (id) {
      console.log(data);
      User.getUserById(id)
        .then((data) => {
          if (data) {
            const { friends } = data;
            res.json({ friends: friends.length });
          }
        })
        .catch((err) => res.json(err));
    } else if (balance) {
      const balanceNumber = parseFloat(balance);
      User.getAll()
        .then((data) => {
          if (data) {
            const resData = data.reduce((acc, currUser) => {
              const { balance } = currUser;
              let balanceToCompare = +balance
                .substring(1, balance.length - 2)
                .split(",")
                .join("");
              if (balanceToCompare > balanceNumber) acc.push(currUser);
              return acc;
            }, []);
            res.json({ totalCount: resData.length, users: resData });
          }
        })
        .catch((err) => res.json(err));
      // User.getUserByBalance(balanceNumber)
      //   .then((data) => {
      //     if (data) {
      //       res.json({ success: true, totalCount: data.length, users: data });
      //     }
      //   })
      //   .catch((err) => res.json(err));
    } else if (name)
      User.getUserByName(name)
        .then((data) => {
          if (data) {
            res.json({ success: true, data });
          } else res.json({ message: `user with name: ${name} not found!` });
        })
        .catch((err) => res.json(err));
    else if (age && isActive) {
      User.getUserByAge(+age, isActive === "false" ? false : true)
        .then((data) => {
          if (data) {
            res.json({ success: true, size: data.length });
          } else res.json({ message: `users with age: ${name} not found!` });
        })
        .catch((err) => res.json(err));
    } else
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
