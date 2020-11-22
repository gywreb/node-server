const Joi = require("joi");
const { ObjectId } = require("mongodb");
const dbConnector = require("../mongodb");

const collection = "user";

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  async save() {
    const db = await dbConnector();
    return db.collection(collection).insertOne(this);
  }
  static async getAll() {
    const db = await dbConnector();
    return db.collection(collection).find().toArray();
  }
  static async getUserById(id) {
    const db = await dbConnector();
    return db.collection(collection).findOne(ObjectId(id));
  }
  static async getUserByEmail(email) {
    const db = await dbConnector();
    return db.collection(collection).findOne({ email });
  }
  static async deleteAll() {
    const db = await dbConnector();
    return db.collection(collection).deleteMany({});
  }
  static async deleteUserByEmail(email) {
    const db = await dbConnector();
    return db.collection(collection).deleteOne({ email });
  }
  static async deleteUserById(id) {
    const db = await dbConnector();
    return db.collection(collection).deleteOne({ _id: ObjectId(id) });
  }
}

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .regex(/@gmail.com$/)
    .required()
    .messages({
      "string.pattern.base": "email is invalid!",
      "string.email": "email is invalid!",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "string.min": "password must be more than 6 characters" }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "confirm password must match with password!" }),
});

module.exports = { userSchema, User };
