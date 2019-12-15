const router = require('express').Router();
const axios = require('axios');

//Nodejs Backend Logging config
const log4js = require('log4js')
const logger = log4js.getLogger();

const authCheck = (req, res, next) => {
    if (!req.user) {
        //User not logged in
        res.redirect('/auth/github');
    }
    else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.send('<h3><center>Profile Page</center></h3><b>Hello, ' + req.user.Github_username + '</b>')
})

router.get('/repo', authCheck, (req, res) => {
    //User enters and then we get repo
    var repoName = "projectworksem4/version0.1"
    axios.get("https://api.github.com/repos" + "/" + repoName + "/pulls")
        .then((repo) => {
            res.send("<b>No of pull request is: " + repo.data[0].number + "</b>");
        })
})

router.get('/repo/:lang', authCheck, (req, res) => {
    //Language from list
    res.send(req.params.lang)
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
})
module.exports = router;