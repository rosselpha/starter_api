const passport = require('passport')
const express = require('express')
const router = express.Router()



router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google') )

router.get('/logout', (req, res)=>{
    req.logOut()
    res.send(req.user)
})

router.get('/', (req, res) =>{
    res.send(req.user)
})

module.exports = router


