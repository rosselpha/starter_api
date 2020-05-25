
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose =require('mongoose')
const User = mongoose.model('User')

passport.serializeUser((user, done) =>{
    done(null, user.id)

})
passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID:
    "378721129607-gnqp5scdcvrloc8a9j2toa7ekb4manak.apps.googleusercontent.com",
  clientSecret: "VhLF7b-cXEbNuDjusmAn7vfY",
    callbackURL: '/auth/google/callback'
}, (acesstoken,refreshToken, profile, done) => {
    
    User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if(existingUser) {
                //we already have a record with the user given ID
                done(null, existingUser)
            }else{

                new User({
                    googleId: profile.id,
                    email: profile._json.email,
                    imageUrl: profile._json.picture,
                    userName: profile.displayName
                    
                }).save()
                    .then(user => done(null, user))
            }
        })

}))

