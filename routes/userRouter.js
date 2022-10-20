const express = require('express')
const router = express.Router()
const userSchema = require('../models/userModel')

// Getting all
router.get('/', async (req, res) => {
  try {
    const users= await userSchema.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.users)
})

// Creating one
router.post('/', async (req, res) => {
  const users = new userSchema({
    name: req.body.name,
    age: req.body.age,
  })
  try {
    const newUser = await users.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.users.name = req.body.name
  }
  if (req.body.age != null) {
    res.users.age = req.body.age
  }
  try {
    const updatedUser = await res.users.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.users.remove()
    res.json({ message: 'Deleted user' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let users
  try {
    users= await userSchema.findById(req.params.id)
    if (users == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.users = users
  next()
}

module.exports = router