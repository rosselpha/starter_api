const passport = require('passport')
const express = require('express')
const router = express.Router()



router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/user', passport.authenticate('google'), (req, res) =>{
    res.redirect('/')
})

router.get('/logout', (req, res)=>{
    req.logOut()
    res.redirect('/')
})

router.get('/', (req, res) =>{
    res.send(req.user)
})
router.get('/req_user', (req, res) =>{
    res.send(req.user)
})

module.exports = router


