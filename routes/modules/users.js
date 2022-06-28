const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  let errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '全部欄位皆為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符'})
  }

  if (errors.length > 0) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('user already exits.')
        return res.render('register', { name, email, password, confirmPassword })
      }
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出!')
  res.redirect('/users/login')
})

module.exports = router
