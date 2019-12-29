const router = require('express').Router();
const passport = require('passport')

//Nodejs Backend Logging configurations
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

router.get('/login',(req,res)=>{
	logger.info('Request send to /login');
	res.json('Logged In');
	logger.info('Request end for /login');
})

router.get('/github',passport.authenticate('github'))

router.get('/logout',(req,res)=>{
	logger.info("Request Send to /logout");
	logger.info('User logging out..')
	req.logout();
	res.redirect('/');
	logger.info("Request End for /logout")
})

router.get('/github/callback',passport.authenticate('github'),(req,res)=>{
	logger.info("Request Send to /callback");
	res.redirect('/profile/')
	logger.info("Request End for /callback");
})
module.exports = router;