const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const myArgs = process.argv[2];

function showOutput(result) {
  console.log(`Found ${result.rowCount} person(s) by the name '${myArgs}':`);
  for (let i in result.rows) {
    let id = result.rows[i].id;
    let first_name = result.rows[i].first_name;
    let last_name = result.rows[i].last_name;
    let birthdate = result.rows[i].birthdate;
    birthdate = birthdate.toString().substring(4, 16);
    console.log(`${id}: ${first_name} ${last_name}, born ${birthdate}`);
  }
}

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query('SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text', [myArgs], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log('Searching...');
    showOutput(result);
    client.end();
  });
});

