const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const auth = require('./auth')
const db = require('./db')
const cors = require('cors')
const app = express()

const viewPath = path.join( __dirname, 'views' );
const publicPath = path.join( __dirname, 'public' );

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'jade' )
app.set('views', viewPath)
app.use( express.static( publicPath ) );
app.use( '/public', express.static( publicPath ) );

app.get('/', async (req, res) => {
  let user
  try {
    // todo: user = verify
    user = auth.verify(req.headers.authorization)
  } catch(e) {
  }
  user = user ? await db.findUserById(user.id) : null // 로그인여부 확인: db에서 user를 id로 찾아 넣는다.
  const userMsg = user ? user.name : 'login plz'

  if(user) {
    res.render('page/user/user', { msg: `Hello, User ${userMsg}`})
  } else {
    res.render('page/user/login', { msg: `Welcome, ${userMsg}` })
  }
})

app.post('/login', async(req, res) => {
  const { email, password } = req.body

  // console.log(req.body)

  const user = await db.findUser({email, password}) //db 에서 유저정보를 찾는다
  if (!user || !user.id) return res.status(401).json({error: 'Login failure'})

  await db.createAccessLog({
    userId: user.id
  })

  const accessToken = auth.signToken(user.id) // auth된 accessToken을 받는다.

  res.redirect('/user')
  // res.render('page/user/user', {msg: `${user.name} ::: ${accessToken}` } )
  // res.json({accessToken})
})

// // todo: callback auth가 있는지 확인한다.
app.get('/user', auth.ensureAuth(), async(req, res) => {
  const user = await db.findUserById(req.user.id) //db 에서 유저를 id로 찾아 넣는다.
  console.log('/user req', req)
  const accessLog = await db.findAccessLog({userId: user.id})

  const userInfo = { user, accessLog }
  res.render('page/user/user', {msg: userInfo})
})

app.get('/logout', (req, res) => {
  res.redirect('/')
})

app.use((err, req, res, next) => {
  console.log(err)
  req.headers.authorization = undefined
  res.json({error: err.message})
})

module.exports = app