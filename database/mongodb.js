const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionString = "mongodb://localhost:27017";
const DATABASE = "node-course";

const dbConnector = async () => {
  try {
    const client = await MongoClient.connect(connectionString);
    return client.db(DATABASE);
  } catch (error) {
    throw error;
  }
};

module.exports = dbConnector;
