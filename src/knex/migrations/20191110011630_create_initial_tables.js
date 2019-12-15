
exports.up = function (knex, Promise) {
    return createUserTable()
        .then(createPullRequestTable);

    function createUserTable() {
        return knex.schema.createTable('users', function (table) {
            table.string('username').notNullable();
            table.string('email').notNullable();
        })
    }

    function createPullRequestTable() {
        return knex.schema.createTable('pull_requests', function(table) {
            table.string('url').notNullable();
            table.string('user').notNullable().references('username').inTable('users');


        })
    }
}

exports.down = function (knex, Promise) {
    return knex.schema
            .dropTable('pull_requests')
            .dropTable('users');
}
