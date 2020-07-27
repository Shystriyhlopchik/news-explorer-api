const mongoose = require('mongoose');

// подключение MongoDB
const connectToMongoDB = (async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/explorer-api', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}, ${err.stack}`);
    process.exit(1);
  }
});


module.exports = { connectToMongoDB };
