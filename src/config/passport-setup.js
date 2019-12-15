const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
const conn = require('./db')
const key = require('../key/data')

//Nodejs Backend Logging config
const log4js = require('log4js')
const logger = log4js.getLogger();

passport.serializeUser((user, done) => {
    done(null, user.Github_username);
})

passport.deserializeUser((Github_username,done)=>{
    // logger.info('User Deserialized:',Github_username)
    conn.query('SELECT * FROM users WHERE Github_username=?',Github_username,(err,response,meta)=>{
        done(null,response[0])
    })
})
passport.use(
    new GitHubStrategy({

        clientID: key[1].CLIENTID,
        clientSecret: key[1].CLIENTSECRET,
        callbackURL: "/auth/github/callback"
    }, (accessToken, refreshToken, profile, done) => {
        //Callback function
        logger.debug('Callback fired..')
        conn.query("SELECT * from users WHERE Github_username=?", profile.username, (err, response, meta) => {
            if (response[0]) {
                //Already Exist
                logger.info("Already exist", response[0].Github_username);
                done(null, response[0])
            }
            else if (err) { logger.error(err) }
            else {
                //Not Exist
                conn.query('INSERT INTO users VALUE (?,?,?,?,?)', [profile.id, profile.username, profile.displayName, profile.profileUrl, profile._json.avatar_url], (err, result) => {
                    if (err) { logger.error(err) }
                    else {
                        logger.info(result)
                        done(null, { "Github_id": profile.id, "Github_username": profile.username, "Github_displayName": profile.displayName, "profile_url": profile.profileUrl, "avatar_url": profile._json.avatar_url })
                    }
                })
            }
        })
    })
)