const jwt = require('jsonwebtoken')
const secret = 'secret token'
const expiresIn = 60

const auth = {
  signToken (id) {
    return jwt.sign({ id }, secret, { expiresIn })
  },
  ensureAuth() {
    return (req, res, next) => {
      // const { authorization } = req.headers
      const { authorization } = window.localStorage.getItem(accessToken);
      console.log('auth:' ,authorization)

      if(!authorization) {
        res.status(401)
        throw Error('No authorization')
      }
      try {
        req.user = this.verify(authorization)
      } catch(e) {
        res.status(401)
        throw e
      }

      next()
    }
  },
  verify (token) {
    console.log('token', token)
    return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
  }
}

module.exports = auth