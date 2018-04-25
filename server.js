'use strict'

require('dotenv').config({path: './dev.env'})
const api = require('./src/api');
const Hapi = require('hapi');
const Knex = require('knex');
const bookingRoutes = require('./src/routes/bookings/index.js');
const userRoutes = require('./src/routes/users/index.js');
const flightRoutes = require('./src/routes/flights/index.js');

const server = Hapi.server({
  host: 'localhost',
  port: 8005
});

// Start the server
async function start () {
  try {
    await server.register(api)
    await server.start()
  } catch (err) {
    console.log(err)
  }

  console.log('Server running at:', server.info.uri)
}

start();

server.route(userRoutes);
server.route(bookingRoutes);
server.route(flightRoutes);
