const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')
const session = require('express-session')
const cors = require('cors')
const app = express()

const viewPath = path.join( __dirname, 'views' );
const publicPath = path.join( __dirname, 'public' );

app.use(cors())
app.use(session({
  secret: 'secretCode',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'jade' )
app.set('views', viewPath)
app.use( express.static( publicPath ) );
app.use( '/public', express.static( publicPath ) );

app.get('/', async (req, res) => {
  sess = req.session // session 초기화
  let user
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
  const user = await db.findUser({email, password}) //db 에서 유저정보를 찾는다
  if (!user || !user.id) return res.status(401).json({error: 'Login failure'})

  await db.createAccessLog({
    userId: user.id
  })

  sess.email = email
  sess.password = password

  res.redirect('/user')
})

// todo: callback auth가 있는지 확인한다.
app.get('/user', async(req, res) => {
  const email = sess.email
  const password = sess.password
  const user = await db.findUser({email, password}) || null
  console.log(user)
  if(user) {
    res.render('page/user/user', {msg: `${user.name}, welcome`})
  } else {
    throw new Error('틀렸어요')
  }
})

app.get('/logout', (req, res) => {
  sess.destroy()
  res.redirect('/')
})

app.use((err, req, res, next) => {
  console.log(err)
  sess.destroy()
  res.json({error: err.message})
})

module.exports = app