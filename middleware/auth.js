const { userSchema, User } = require("../database/models/user");

const registerValidation = (req, res, next) => {
  const { email } = req.body;
  const { error: schemaError } = userSchema.validate(req.body);
  User.getUserByEmail(email).then((data) => {
    if (data) {
      res.json({ message: "email is already used!" });
    } else {
      schemaError
        ? res.status(404).json({ message: error.details[0].message })
        : next();
    }
  });
};

module.exports = registerValidation;
