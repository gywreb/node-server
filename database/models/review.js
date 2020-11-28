const dbConnector = require("../mongodb");

const collection = "reviews";

exports.Review = class Review {
  static async getAll() {
    const db = await dbConnector();
    return db
      .collection(collection)
      .aggregate([
        {
          $lookup: {
            from: "bootcamps",
            localField: "bootcamp",
            foreignField: "_id",
            as: "bootcamp_detail",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $unwind: "$bootcamp_detail",
        },
        {
          $unwind: "$user_detail",
        },
        {
          $project: {
            bootcamp: 0,
            user: 0,
            bootcamp_detail: { _id: 0 },
            user_detail: { _id: 0, password: 0 },
          },
        },
      ])
      .toArray();
  }
};
