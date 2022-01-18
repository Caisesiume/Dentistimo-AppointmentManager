const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {}, (err) => {
  if (!err) {
    console.log(`Connected to MongoDB`);
  } else {
    console.error(`Failed to connect to MongoDB`);
    console.error(err.stack);
    process.exit(1);
  }
});

module.exports = mongoose
