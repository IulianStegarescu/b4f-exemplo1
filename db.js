
const { MongoClient } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"
const DB_NAME = "Armazenamento4"
const COLLECTION_USERS = "Ex4"


async function getMongoCollection() {
    const client = await connectToMongo()
    return client.db(DB_NAME).collection(COLLECTION_USERS)
  }

let client
async function connectToMongo() {
  try {
    if (!client) {
      client = await MongoClient.connect(URL)
    }
    return client;
  } catch (err) {
    console.log(err)
  }
}

module.exports = { getMongoCollection }