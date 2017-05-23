const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex,public'
});

const myArgs = process.argv[2];

function showOutput(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${myArgs}':`);
  for (let i in rows) {
    let id = rows[i].id;
    let first_name = rows[i].first_name;
    let last_name = rows[i].last_name;
    let birthdate = rows[i].birthdate;
    birthdate = birthdate.toString().substring(4, 16);
    console.log(`${id}: ${first_name} ${last_name}, born ${birthdate}`);
  }
}

const query = knex.select().from('famous_people').where('first_name', myArgs).orWhere('last_name', myArgs);

query.asCallback((err, rows) => {
  if (err) {
    return console.error('Error running query', err);
  }
  console.log('Searching...')
  showOutput(rows);
})

knex.destroy();