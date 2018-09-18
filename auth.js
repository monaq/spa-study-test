// const jwt = require('jsonwebtoken')
const secret = 'secret token'
const expiresIn = 60

const auth = {
  signToken (id) {
    sess.userId = id
    // return jwt.sign({ id }, secret, { expiresIn })
  },
  ensureAuth() {
    return (req, res, next) => {
      // console.log('authtoken:' , sess)
      // const authorization = sess.accessToken
      // console.log('auth:' , sess)

      // if(!authorization) {
      //   res.status(401)
      //   throw Error('No authorization')
      // }
      // try {
      //   req.user = this.verify(authorization)
      // } catch(e) {
      //   res.status(401)
      //   throw e
      // }

      const userId = sess.userId
      const userPwd = sess.userPwd

      
      

      next()
    }
  },
  verify (token) {
    console.log('token', token)
    return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
  }
}

module.exports = auth