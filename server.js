const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const { MONGODB_URL } = require('./config')

global.__basedir = __dirname;
// mongoose.connect(MONGOBD_URL);
// mongoose.set('strictQuery', true);
// mongoose.connection.on('connected', () => {
//     console.log("DB connected");
// })
// mongoose.connection.on('error', (error) => {
//     console.log("Some error while connecting to DB");
// })

mongoose.set('strictQuery', false);
async function connectToDatabase() {
    // const MONGODB_URL = 'mongodb://localhost:27017/your_database_name'; // Replace with your MongoDB connection string
  
    try {
      await mongoose.connect(MONGODB_URL, {
      });
  
      console.log('DB connected');
    } catch (error) {
      console.error('Error connecting to DB:', error.message);
    }
  }
  
  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  });
  
  // Call the connectToDatabase function to establish the connection
  connectToDatabase();

require('./models/user_model');
require('./models/post_model');

app.use(cors());
app.use(express.json());

app.use(require('./routes/user_route'));
app.use(require('./routes/post_route'));
app.use(require('./routes/file_route'));

app.listen(process.env.PORT||4000, () => {
    console.log("Server started");
});