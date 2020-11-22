const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// const localUri = "mongodb://localhost:27017";
const uri = process.env.MONGODB_URI;
const DATABASE = "node-course";

// let db;

// exports.getConnection = () => {
//   MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((client) => {
//       db = client.db(DATABASE);
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// exports.getDb = () => {
//   if (db) return db;
// };

// module.exports = { getConnection, getDb };

const dbConnector = async () => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.db(DATABASE);
  } catch (error) {
    throw error;
  }
};

dbConnector();

module.exports = dbConnector;
