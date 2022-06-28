const express = require('express')
const router = express.Router()

const { authenticator } = require('../middleware/auth')
const users = require('./modules/users')
const todos = require('./modules/todos')
const home = require('./modules/home')

router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router
