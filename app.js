(async()  =>  {
    
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const logger = require('morgan')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')
const contestRoutes = require('./routes/contest')
require('./models/User')
require('./services/passport')
const app = express()

port = process.env.PORT || 5000

app.use(logger('dev'))
app.use(bodyParser.json())

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'content-Type, Authorization')
  next()
})

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys:['MMMKMKKkkkmdmkdmsm']
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', authRoutes)
app.use('/api', contestRoutes)

app.get('/', (req, res) => {
    res.json({ hello: "hello" })
})

app.use((req, res, next)=> {
  res.status(404).json({'page': "not found"})
})

mongoose
  .connect(
    'mongodb://root:ross12345@ds211029.mlab.com:11029/voted'
  )
  .then(result => {
    app.listen(port, () => {
      console.log(`server as started on port ${port} and database is connected`)
    })
  })

  .catch(err => console.log(err));


})()