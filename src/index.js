const express = require('express')
const session = require('express-session')
const passport = require('./passport')
const api = express()

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

api.get('/auth/github',
    passport.authenticate('github'));

api.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        return res.json(req.user)
    })
api.listen(3000, () => {
    console.log('Rodando na porta 3000')
})