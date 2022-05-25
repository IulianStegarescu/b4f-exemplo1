const {getMongoCollection} = require("./db")
const {ObjectId} = require("mongodb")
const DB_NAME = "Armazenamento4"
const COLLECTION_USERS = "Ex4"

async function readAll() {
    const collection = await getMongoCollection(DB_NAME,COLLECTION_USERS)
    const result = await collection.find().toArray()
    return result
  }
  async function createReminder(obj) {
    const collection = await getMongoCollection(DB_NAME, COLLECTION_USERS)
    const result = await collection.insertOne(obj)
    return result.insertedId
  }
  async function readOne(id) {
    const collection = await getMongoCollection(DB_NAME,COLLECTION_USERS)
    const result = await collection.findOne({_id:ObjectId(id)})
    return result
  }
  async function updateOne(id,description,remindAt) {
    const collection = await getMongoCollection(DB_NAME,COLLECTION_USERS)
    const result = await collection.updateOne(
        {_id:ObjectId(id)},
        {$set: {description:description,remindAt:remindAt}},
        {upsert: true }
       )
    return result
  }
  async function deleteById(id) {
    const collection = await getMongoCollection(DB_NAME, COLLECTION_USERS)
    const result = await collection.deleteOne({_id:ObjectId(id)})
    return result.deletedCount
  }



module.exports = {readAll,createReminder,readOne,updateOne,deleteById}