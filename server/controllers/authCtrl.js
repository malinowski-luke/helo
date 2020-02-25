const bcrypt = require('bcryptjs')
const img = require('../imgGenerator/imgGenerator')
module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { username, password } = req.body
    let user = await db.check_user([username])
    user = user[0]
    if (user) return res.status(400).send('user already exists')

    const salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt)
    let newUser = await db.register_user([
      username,
      hash,
      img.generateRandomImg
    ])
    newUser = newUser[0]
    session.user = newUser
    res.status(201).send(session.user) // send back user
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { username, password } = req.body
    let user = await db.check_user([username])
    user = user[0]
    if (!user) return res.status(400).send('username not found')
    const authenticated = bcrypt.compareSync(password, user.password)
    if (authenticated) {
      delete user.password
      session.user = user
      res.status(202).send(session.user)
    } else res.status(401).send('incorrect password')
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
  getUser: (req, res, next) => {
    const { user } = req.session
    if (user) res.status(200).send(user)
    else next()
  }
}
