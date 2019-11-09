// to use knex just `const knex = require('./knex/knex.js');`

const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);