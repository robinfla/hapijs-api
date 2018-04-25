const Boom = require('boom');

const Knex = require('knex') ({
  client: 'postgresql',
  connection: {
    host:'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
    database: 'citizen',
    user: 'robin',
    password: 'password'
  }
});

module.exports = {
  path: '/users',
  method: 'GET',
  handler: (request, h) => {
    if(!request.headers.userid) {
      return Boom.badRequest('missing user Id');
    }
    return Knex.select('firstName', 'lastName', 'email')
      .from('users')
      .where({ userId: request.headers.userid })
      .then((data) => {
        if(!data) {
          return Boom.notFound('No user match this id');
        }
        return data;
      })
      .catch((err) => {
        return Boom.badImplementation(err);
      });
  }
};
