const dotenv = require('dotenv')
dotenv.config()

const { MongoClient } = require('mongodb');

let database

const initDb = async (callback) => {
  try {
    if (database) {
      console.log('Database is already initialized!')
      return callback(null, database)
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL)
    database = client.db()
    callback(null, database)
  } catch (err) {
    console.error('Error initializing database:', err)
    callback(err)
  }
}

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized')
  }
  return database
}

module.exports = {
  initDb,
  getDatabase
}