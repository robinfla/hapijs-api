const Boom = require('boom');
const User = require('../../../models/User.js');
const Flight = require('../../../models/Flight.js');
const Booking = require('../../../models/Booking.js');

const Knex = require('knex') ({
  client: 'postgresql',
  connection: {
    host:'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
    database: 'citizen',
    user: 'robin',
    password: 'password'
  }
});

module.exports = [{
  path: '/users',
  method: 'GET',
  handler: (req, h) => {
    if(!req.headers.userid) {
      return Boom.badRequest('missing user Id');
    }
    return Knex.select('firstName', 'lastName', 'email')
      .from('users')
      .where({ userId: req.headers.userid })
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
},
  {
    path: '/users/all', // gather all information related to a user: personal info, flights and bookings
    method: 'GET',
    handler: async (req, h) => {
      if(!req.headers.userid) {
        return Boom.badRequest('missing user Id');
      }
      let res = {};
      try {
        const user = await User
          .query()
          .where('userId', req.headers.userid);
        if(user.length === 0) {
          return Boom.notFound('No user match this id');
        }
        res.userId = req.headers.userid;
        res.userFirstName = user[0].firstName;
        res.userLastName = user[0].lastName;
        res.userEmail = user[0].email;
        res.userCreationDate = user[0].created_at;

        const flights = await Flight
          .query()
          .where('userId', req.headers.userid)
          .orderBy('created_at');
        if(flights.length > 0) {
          res.flights = flights;
        }

        let bookings = [];
        res.flights = await res.flights.map(async (flight) => {
          bookings = await Booking
            .query()
            .where('flightId', flight.flightId)
            .orderBy('created_at');
          if(bookings.length > 0) {
            // let index = res.flights.findIndex((search) => {
            //   return search.flightId === flight.flightId;
            // });
            // res.flights[index].bookings = bookings;
            flight.bookings = bookings;
          }
        });
        console.log(res);
        return res;
      }
      catch(err) {
        return Boom.badImplementation(err);
      }
    }
  }];
