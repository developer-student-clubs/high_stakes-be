const router = require('express').Router();
const passport = require('passport')

//Nodejs Backend Logging configurations
const log4js = require('log4js')
const logger = log4js.getLogger();

router.get('/login',(req,res)=>{
	res.send('Logged In');
})

router.get('/github',passport.authenticate('github'))

router.get('/logout',(req,res)=>{
	logger.warn('User logging out..')
	req.logout();
	res.redirect('/');
})

router.get('/github/callback',passport.authenticate('github'),(req,res)=>{
	res.redirect('/profile/')
})
module.exports = router;