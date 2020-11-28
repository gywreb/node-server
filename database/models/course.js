const dbConnector = require("../mongodb");

exports.Course = class Course {
  // get alll course had tuition > 10000 & user_detail
  static async getAll() {
    const db = await dbConnector();
    return db
      .collection("courses")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $match: { tuition: { $gt: 10000 } },
        },
        {
          $project: { user_detail: { password: 0 } },
        },
      ])
      .toArray();
  }
};
