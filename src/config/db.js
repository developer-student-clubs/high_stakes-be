//DATABASE CONNECTION
const mariadb = require('mariadb/callback');
const key = require('../key/data')

//Nodejs Backend Logging config
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

// const options = {
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '1234',
//         database: 'auth_test'
//     }
// }

// const knex = require('knex')(options);

// knex.raw("SELECT VERSION()").then(
//     (version) => console.log((version[0][0]))
// ).catch((err) => { console.log( err); throw err })
//     .finally(() => {
//         knex.destroy();
// 	});
	
const conn = mariadb.createConnection({
	user: key[0].user,
	password: key[0].password,
	database: key[0].database,
	host: key[0].host,
	port: key[0].port
})
 
conn.connect(err => {
	if (err) {
		logger.error(err);
	} else {
		logger.info('MariaDB connected..')

	}
})
module.exports = conn
//module.exports = knex;