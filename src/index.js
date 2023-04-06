const express = require('express')

const api = express()
var session = require('express-session')
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: 'user:email'
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

api.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))



api.use(passport.initialize())
api.use(passport.session())

api.get('/', (req, res) => {
    return res.status(200).json({ api: 'Api de login' })
})

api.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

api.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        return res.json(req.user)
    });


api.listen(3000, () => {
    console.log('Rodando na porta 3000')
})