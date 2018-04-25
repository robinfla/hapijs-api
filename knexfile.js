module.exports = {
  development: {
        client: 'postgresql',
    connection: {
            host: 'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
            port: '5432',
            database: 'citizen',
            user:     'robin',
            password: 'password'
    },
    migrations: {
            tableName: 'knex_migrations'
    },
        seeds: { tableName: './seeds'  },
  }
};
