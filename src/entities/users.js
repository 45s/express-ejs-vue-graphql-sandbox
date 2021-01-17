import bcrypt from 'bcrypt'

export let users = [
  {
    id: 'id-01',
    password: await bcrypt.hash('password', 10),
    email: 'mail@mail.ua',
    name: 'user',
  },
]
