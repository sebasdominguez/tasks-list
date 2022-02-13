const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const db = await mongoose.connect("mongodb://mongo/mydatabase");
    mongoose.set("debug", true);
    mongoose.Promise = Promise;
    console.log(`DB connected to ${db.connection.host}`);
  } catch (error) {
    console.error("DB connection error: ", error);
  }
};
