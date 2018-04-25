export default require('knex') ({
  client: 'postgresql',
  connection: {
    host:'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
    user: 'robin',
    password: 'password',
    database: 'citizen',
  }
})
