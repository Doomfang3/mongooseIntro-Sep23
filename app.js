const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/User.model')

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/users', async (request, response) => {
  console.log(request.query)
  const { searchTerm } = request.query
  if (searchTerm) {
    const users = await User.find({ username: searchTerm })
    response.json({ users })
  } else {
    const users = await User.find()
    response.json({ users })
  }
})

app.get('/users/:userId', async (request, response) => {
  const { userId } = request.params
  if (mongoose.isValidObjectId(userId)) {
    try {
      const currentUser = await User.findById(userId)
      if (currentUser) {
        response.json({ user: currentUser })
      } else {
        response.status(404).json({ message: 'User not found' })
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    }
  } else {
    response.status(400).json({ message: 'The id seems wrong' })
  }
})

app.post('/users', async (request, response) => {
  try {
    const newUser = await User.create(request.body)
    response.status(201).json({ user: newUser })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})

app.put('/users/:userId', async (request, response) => {
  const { userId } = request.params

  console.log(userId)

  try {
    const newUser = await User.findByIdAndUpdate(userId, request.body, { new: true })
    response.status(202).json({ user: newUser })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})

app.delete('/users/:userId', async (request, response) => {
  const { userId } = request.params

  await User.findByIdAndDelete(userId)
  response.status(202).json({ message: 'User deleted' })
})

mongoose
  .connect('mongodb://127.0.0.1:27017/mongooseIntro')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen('4000', () => {
      console.log('Listening on 4000')
    })
  })
  .catch(err => console.error('Error connecting to mongo', err))
