const { userSchema, User } = require("../database/models/user");

const registerValidation = (req, res, next) => {
  const { email } = req.body;
  const { error } = userSchema.validate(req.body);
  User.getUserByEmail(email).then((data) => {
    if (data) {
      res.json({ message: "email is already used!" });
    } else {
      error
        ? res.status(400).json({ message: error.details[0].message })
        : next();
    }
  });
};

module.exports = registerValidation;
