import { Router } from 'express'
import bcrypt from 'bcrypt'

import { appRoutes } from '../config/index.js'
import { checkNotAuthenticated } from '../middlewares/index.js'
import { users } from '../entities/index.js'

export const routerRegister = Router()

const { register } = appRoutes

routerRegister.get(register, checkNotAuthenticated, (req, res) => {
  res.render('register.ejs', {
    title: 'Register',
    pageId: 'register',
  })
})

routerRegister.post(register, checkNotAuthenticated, async (req, res) => {
  try {
    const { password, email, name } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    users.push({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    })
    res.redirect('/login')
  } catch (e) {
    res.redirect('/register')
  }
})
