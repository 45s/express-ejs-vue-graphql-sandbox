import { Router } from 'express'

import { appRoutes } from '../config/index.js'

export const routerLogout = Router()

const { logout } = appRoutes

routerLogout.delete(logout, (req, res) => {
  // logOut function set 'passport' automatically
  req.logOut()
  res.redirect('/login')
})
