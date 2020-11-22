const { articleSchema } = require("../database/models/article");

exports.articleValidation = (req, res, next) => {
  const { content } = req.body;
  const { error } = articleSchema.validate({ content });
  error ? res.status(400).json({ message: error.details[0].message }) : next();
};
