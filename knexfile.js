const settings = require('./settings');
module.exports = {

  development: {
    client: 'pg',
    connection: settings,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
