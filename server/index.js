require('dotenv').config()
const express = require('express'),
  massive = require('massive'),
  session = require('express-session'),
  app = express(),
  ctrlAuth = require('./controllers/authCtrl'),
  ctrl = require('./controllers/ctrl')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

// middleware
app.use(express.json())
// stored on req request req.sesseion
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET
  })
)
// db connection
massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
  .then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT || 4040, () =>
      console.log(`|----server running on port:${SERVER_PORT}----|`)
    )
    console.log('database connected')
  })
  .catch(err => console.log(`database not connected\n ${err}`))

// auth endpoints
app.post('/api/auth/register', ctrlAuth.register)
app.post('/api/auth/login', ctrlAuth.login)
app.post('/api/auth/logout', ctrlAuth.logout)
app.get('/api/user', ctrlAuth.getUser)

//app functionality
app.get('/api/posts', ctrl.getAllPosts)
app.get('/api/posts/:user_id', ctrl.getPosts)
app.get('/api/search', ctrl.searchPosts)
app.get('/api/post/:post_id', ctrl.getPost)
app.post('/api/post/:user_id', ctrl.addPost)
app.put('/api/post/:post_id', ctrl.editPost)
app.delete('/api/post/:post_id', ctrl.deletePost)
