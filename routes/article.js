const express = require("express");
const { Article } = require("../database/models/article");
const { User } = require("../database/models/user");
const { articleValidation } = require("../middleware/article");
const router = express.Router();

// middleware for post only
router.post("/", articleValidation);
router.patch("/", articleValidation);

router
  .route("/")
  .get((req, res) => {
    Article.getAll()
      .then((data) => res.json({ success: true, articles: data }))
      .catch((err) => res.json(err));
  })
  .post((req, res) => {
    const { content } = req.body;
    const article = new Article(content);
    article
      .save()
      .then((data) => res.json({ message: "new article added!", data }))
      .catch((err) => res.json(err));
  })
  .delete((req, res) => {
    const { id } = req.body;
    Article.deleteArticleById(id)
      .then((data) => {
        const { deletedCount } = data;
        deletedCount
          ? res.json({ success: true, data })
          : res.status(404).json({ message: "id is required!" });
      })
      .catch((err) =>
        res.status(404).json({ message: "article with given id not found!" })
      );
  })
  .patch((req, res) => {
    const { id, content } = req.body;
    Article.updateArticleById(id, content)
      .then((data) => {
        const { modifiedCount } = data;
        console.log(modifiedCount);
        modifiedCount
          ? res.json({ success: true, data })
          : res.status(400).json({ message: "id is required!" });
      })
      .catch((err) =>
        res.status(404).json({ message: "article with given id not found!" })
      );
  });

module.exports = router;
