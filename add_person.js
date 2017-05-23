const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex,public'
});

const myArgs = process.argv.slice(2);

const query = knex('famous_people').insert({first_name: myArgs[0],
  last_name: myArgs[1],
  birthdate: myArgs[2]
});

query.asCallback((err, rows) => {
  if (err) {
    return console.error('Error running query', err);
  }
  console.log('New Data Inserted.');
});

knex.destroy();

