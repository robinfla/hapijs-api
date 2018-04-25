const Boom = require('boom');
const _ = require('lodash');
const moment = require('moment');

const Knex = require('knex') ({
  client: 'postgresql',
  connection: {
    host:'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
    database: 'citizen',
    user: 'robin',
    password: 'password'
  }
});

async function getFlight(flightId) {
  return await Knex('flights')
    .where('flightId', flightId);
}

module.exports = [{
  path: '/bookings',
  method: 'GET',
  handler: (request, h) => {
    if(!request.headers.flightid) {
      return Boom.badRequest('missing flightId');
    }
    console.log(request.headers.flightid);
    return Knex('bookings')
      .where('flightId', request.headers.flightid)
      .then((data) => {
        console.log(data);
        if(!data) {
          return Boom.notFound('no bookings were found for this flight');
        }
        return data;
      })
      .catch((err) => {
        return Boom.badImplementation(err);
      });
  }
}, {
  path: '/bookings',
  method: 'POST',
  handler: async (request, h) => {
    if(_.isEmpty(request.payload)) {
      return Boom.badRequest('Missing parameters');
    }
    if(!request.payload.flightId) {
      return Boom.badRequest('Missing flight Id');
    }
    if(!request.payload.firstName) {
      return Boom.badRequest('Missing buyer first name');
    }
    if(!request.payload.lastName) {
      return Boom.badRequest('Missing buyer last name');
    }
    if(!request.payload.email) {
      return Boom.badRequest('missing buyer email');
    }
    if(!request.payload.price) {
      return Boom.badRequest('missing price information')
    }
    if(!request.payload.seats) {
      return Boom.badRequest('missing number of seats taken');
    }
    try {
      const flight = await getFlight(request.payload.flightId);
      if(flight.length === 0) {
        return Boom.notFound('No flights were found for this id');
      }
      let booking = {};
      let date = new Date();
      let creationDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

      booking.flightId = request.payload.flightId;
      booking.firstName = request.payload.firstName;
      booking.lastName = request.payload.lastName;
      booking.email = request.payload.email;
      booking.price = parseInt(request.payload.price, 10);
      booking.seats = parseInt(request.payload.seats, 10);
      booking.created_at = creationDate;

      const insert = await Knex('bookings').insert(booking);
      return booking;
    } catch (err) {
      return Boom.badImplementation(err);
    }
  }
}];
