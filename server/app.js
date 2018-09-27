const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')
const session = require('express-session')
const app = express()

const viewPath = path.join( __dirname, 'views' );
const publicPath = path.join( __dirname, 'public' );

app.use(session({
  secret: 'secretCode',
  maxAge: 100 * 60 * 60, // 쿠키 유효기간
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.set('view engine', 'jade' )
// app.set('views', viewPath)
app.use( express.static( publicPath ) );
app.use( '/public', express.static( publicPath ) );

app.get('/', async (req, res) => {
  const sess = req.session
  let user
  try {
    user = sess.userId ? await db.findUserById(sess.userId) : null // 로그인되어있는지 확인
  } catch(e) {
  }

  res.json(user)

  // if(user) {
  //   res.redirect('/user')
  // } else {
  //   res.render('page/user/login')
  // }
})

app.post('/login', async(req, res) => {
  const sess = req.session
  const { email, password } = req.body
  const user = await db.findUser({email, password}) //db 에서 유저정보를 찾는다
  if (!user || !user.id) return res.status(401).json({error: 'Login failure'})

  sess.email = email
  sess.password = password
  sess.userId = user.id

  // res.redirect('/user')
  res.json({
    email: sess.email,
    password: sess.password,
    userId: sess.userid
  })
})

// todo: callback auth가 있는지 확인한다.
app.get('/user', async(req, res) => {
  const sess = req.session
  const email = sess.email
  const password = sess.password
  const user = await db.findUser({email, password}) || null
  if(user) {
    res.json(user)
  } else {
    res.json({msg: '로그인 실패'})
    throw new Error('로그인실패염')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  // res.redirect('/')
})

module.exports = app
