require("dotenv").config();
const mongoose = require("mongoose");

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on("error", (err) => {
  console.log(err);
  throw new Error(err);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  try {
    return mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    //return mongoose.connection
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

exports.disconnect = mongoose.disconnect.bind(mongoose);
