import { Router } from 'express'
import passport from 'passport'

import { appRoutes } from '../config/index.js'
import { checkNotAuthenticated } from '../middlewares/index.js'

export const routerLogin = Router()

const { login } = appRoutes

routerLogin.get(login, checkNotAuthenticated, (req, res) => {
  res.render('login.ejs', {
    title: 'Login page',
    pageId: 'login',
  })
})

routerLogin.post(
  login,
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: login,
    failureMessage: true,
  })
)
