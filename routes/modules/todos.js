const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
