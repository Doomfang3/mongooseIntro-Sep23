const mongoose = require('mongoose')
const Schema = mongoose.Schema

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: [String],
})

// CREATE MODEL
// The model() method defines a model (User) and creates a collection (users) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "User" --> "users"
const User = mongoose.model('User', userSchema)

// EXPORT THE MODEL
module.exports = User
