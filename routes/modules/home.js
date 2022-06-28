const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
  const UserId = req.user.id
  return Todo.findAll({
    where: { UserId },
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos }))
    .catch(error => res.status(422).json(error))
})

module.exports = router
