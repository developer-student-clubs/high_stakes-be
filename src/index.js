const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup');
const mariadb = require('mariadb/callback');
const db = require('./config/db');
const cookieSession = require('cookie-session');
const passport = require('passport');
const key = require('./key/data');
const cors = require('cors');

//Nodejs Backend Logging config
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const app = express();
//Added cors
app.use(cors());
 
 app.use((req, res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Acess-Control-Allow-Credentials','true')
	next();
  });

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys:[key[2].HASH]
}))

//INTIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
	logger.info("Request Send to /");
	res.status(200).json('OK');
	logger.info("Request End for /");
})

app.use('/auth', authRoutes);
app.use('/profile',profileRoutes);

app.listen(3000, () => {
	logger.info('Server accepting requestes in port 3000');
})
