import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'

import { users } from '../entities/index.js'

export function initializePassport(passport) {
  const getUserByEmail = email => users.find(user => user.email === email)
  const getUserById = id => users.find(user => user.id === id)

  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (!user) {
      return done(null, false, { message: 'Not user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      }
      return done(null, false, { message: 'Password incorrect' })
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new Strategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}
