import { appRoutes } from '../config/index.js'

export function checkAuthenticated(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect(appRoutes.login)
}

export function checkNotAuthenticated(req, res, next) {
  return req.isAuthenticated() ? res.redirect('/') : next()
}
