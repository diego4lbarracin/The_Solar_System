const { MongoClient } = require("mongodb");

let db = null;

async function connectToDatabase() {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log(`Connected to MongoDB database: ${process.env.DB_NAME}`);
  return db;
}

module.exports = { connectToDatabase };
