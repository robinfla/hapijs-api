const Boom = require('boom');
const _ = require('lodash');
const moment = require('moment');
const uuid = require('uuid/v4');

const Knex = require('knex') ({
  client: 'postgresql',
  connection: {
    host:'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
    database: 'citizen',
    user: 'robin',
    password: 'password'
  }
});

async function getUser(userId) {
  return await Knex('users')
    .where('userId', userId);
}

module.exports = [{
  path: '/flights',
  method: 'GET',
  handler: (request, h) => {
    if(!request.headers.userid) {
      return Boom.badRequest('missing userid');
    }
    return Knex('flights')
      .where('userId', request.headers.userid)
      .then((data) => {
        if(!data) {
          return Boom.notFound('no flights were found for this user');
        }
        return data;
      })
      .catch((err) => {
        return Boom.badImplementation(err);
      });
  }
}, {
  path: '/flights',
  method: 'POST',
  handler: async (request, h) => {
    if(_.isEmpty(request.payload)) {
      return Boom.badRequest('Missing parameters');
    }
    if(!request.payload.userId) {
      return Boom.badRequest('Missing user Id');
    }
    if(!request.payload.from) {
      return Boom.badRequest('Missing departure origin');
    }
    if(!request.payload.to) {
      return Boom.badRequest('Missing destination');
    }
    if(!request.payload.price) {
      return Boom.badRequest('missing price information');
    }
    if(!request.payload.seats) {
      return Boom.badRequest('missing number of seats available')
    }
    try {
      const user = await getUser(request.payload.userId);
      if(user.length === 0) {
        return Boom.notFound('No users were found for this id');
      }
      let flight = {};
      let date = new Date();
      let creationDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

      flight.userId = request.payload.userId;
      flight.flightId = uuid();
      flight.origin = request.payload.from;
      flight.destination = request.payload.to;
      flight.price = parseInt(request.payload.price, 10);
      flight.seatsAvailable = parseInt(request.payload.seats, 10);
      flight.status = 'OPEN';
      flight.created_at = creationDate;

      const insert = await Knex('flights').insert(flight);
      return flight;
    } catch (err) {
      return Boom.badImplementation(err);
    }
  }
}];
