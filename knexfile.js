module.exports = {
  development: {
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },

    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'robin',
      password: 'password',
      insecureAuth: true,

      database: 'my_db',
      charset: 'utf8',
    }
  }
};
