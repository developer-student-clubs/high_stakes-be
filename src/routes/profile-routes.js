const router = require('express').Router();
const axios = require('axios');

//Nodejs Backend Logging config
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const authCheck = (req, res, next) => {
    if (!req.user) {
        //User not logged in
        logger.info('Authentication check for profile..')
        res.redirect('/auth/github');
        logger.info('Request End for authentication check..')
    }
    else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    logger.info('Request Send to /profile');
    res.json(req.user.Github_username)
    logger.info('Request End for /profile');
})

router.get('/repo', authCheck, (req, res) => {
    //User enters and then we get repo
    logger.info('Request Send to profile/repo');
    var repoName = "projectworksem4/version0.1"
    axios.get("https://api.github.com/repos" + "/" + repoName + "/pulls")
        .then((repo) => {
            res.json(repo.data[0].number);
        })
    logger.info('Request End for profile/repo');    
})

router.get('/repo/:lang', authCheck, (req, res) => {
    //Language from list
    logger.info('Request Send to profile/repo/:lang');
    res.json(req.params.lang)
    axios.get("https://api.github.com/search/repositories?per_page=4&q="+req.params.lang)
        .then((d) => {
            var i;
            repo_data = d.data.items
            for (i = 0; i < 4; i++) {
                logger.level = 'debug';
                logger.debug(d.data.items[i].html_url)
                logger.debug(d.data.items[i].owner.avatar_url)
                logger.debug(d.data.items[i].description+"\n")
            }

        })
    logger.info('Request End for profile/repo/:lang');    
})
module.exports = router;