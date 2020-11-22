const Joi = require("joi");
const { ObjectId } = require("mongodb");
const dbConnector = require("../mongodb");

const collection = "article";

exports.Article = class Article {
  constructor(content) {
    this.content = content;
    this.create_at = Date.now();
  }
  async save() {
    const db = await dbConnector();
    return db.collection(collection).insertOne(this);
  }
  static async getAll() {
    const db = await dbConnector();
    return db.collection(collection).find().toArray();
  }
  static async getArticleById(id) {
    const db = await dbConnector();
    return db.collection(collection).findOne(ObjectId(id));
  }
  static async deleteArticleById(id) {
    const db = await dbConnector();
    return db.collection(collection).deleteOne({ _id: ObjectId(id) });
  }
  static async updateArticleById(id, newContent) {
    const db = await dbConnector();
    return db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: { content: newContent } });
  }
};

exports.articleSchema = Joi.object({
  content: Joi.string()
    .min(8)
    .required()
    .messages({ "string.min": "Your content must be at least 8 characters" }),
});
