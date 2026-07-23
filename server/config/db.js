const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // No connection string provided -> spin up an in-memory MongoDB so the
    // app runs fully locally with no external database. Data resets on restart.
    if (!uri) {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log("Using in-memory MongoDB (no MONGO_URI set)");
      console.log("Mongo URI:", uri);
    }

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
