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
    return db.collection(collection).find({}).toArray();
  }
  static async getUserById(id) {
    const db = await dbConnector();
    return db.collection(collection).findOne({ _id: id });
    // return db.collection(collection).findOne(ObjectId(id));
  }
  static async getUserByEmail(email) {
    const db = await dbConnector();
    return db.collection(collection).findOne({ email });
  }
  static async getUserByName(name) {
    const db = await dbConnector();
    return db.collection(collection).findOne({ name });
  }
  static async getUserByAge(age, isActive) {
    const db = await dbConnector();
    return db
      .collection(collection)
      .find({ age: { $gt: age }, isActive })
      .toArray();
    // $gt : greater than
    // $lt : less than
    // $eq : equal
    // $lte : less than and equal
    // $gte : greater than and equal
    // $ne : not equal
  }
  static async getUserByBalance(balance) {
    const db = await dbConnector();
    return db.collection(collection).aggregate([
      {
        $addFields: {
          balanceNumber: {
            $toDouble: {
              $reduce: {
                input: {
                  $split: [{ $substrBytes: ["$balance", 1, -1] }, ","],
                },
                initialValue: "",
                in: { $concat: ["$$value", "$$this"] },
              },
            },
          },
        },
      },
      {
        $match: {
          balanceNumber: { $gt: balance },
        },
      },
    ]);
    // return db
    //   .collection(collection)
    //   .find({
    //     $expr: {
    //       $gt: [
    //         {
    //           $toDouble: {
    //             $reduce: {
    //               input: {
    //                 $split: [
    //                   {
    //                     $substrBytes: [
    //                       "$balance",
    //                       1,
    //                       { $subtract: [{ $strLenCP: "$balance" }, 2] },
    //                     ],
    //                   },
    //                   ",",
    //                 ],
    //               },
    //               initialValue: "",
    //               in: { $concat: ["$$value", "$$this"] },
    //             },
    //           },
    //         },
    //         balance,
    //       ],
    //     },
    //   })
    //   .toArray();
  }
  static async getUser() {
    // SELECT name, age FROM users ==> SQL
    // $project mongo (0: disable, 1: enable)
    const db = await dbConnector();
    return db
      .collection(collection)
      .aggregate([
        {
          $project: { _id: 0, name: 1, age: 1, isActive: 1 },
        },
      ])
      .toArray();
  }
  static async getUserRole(id) {
    // $match <=> where trong SQL
    // $lookup <=> join trong SQL
    const db = await dbConnector();
    return db
      .collection("test-user")
      .aggregate([
        {
          $match: { _id: ObjectId(id) },
        },
        {
          $lookup: {
            from: "test-role",
            localField: "roleId",
            foreignField: "role_id",
            as: "role_detail",
          },
        },
        {
          $project: {
            roleId: 0,
            role_detail: { role_name: 0, _id: 0 },
          },
        },
      ])
      .toArray();
  }
  static async getUserArticle(id) {
    const db = await dbConnector();
    return db
      .collection("test-user")
      .aggregate([
        {
          $match: { _id: ObjectId(id) },
        },
        {
          $lookup: {
            from: "test-article",
            localField: "name",
            foreignField: "author",
            as: "articles",
          },
        },
        {
          $project: { roleId: 0 },
        },
      ])
      .toArray();
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
