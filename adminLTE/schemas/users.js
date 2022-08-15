const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  { 
    username: String, 
    password: String,
    level: Number  
  }
);
module.exports = mongoose.model('users', schema);
