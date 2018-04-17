'use strict'

const api = require('./src/api')
const Hapi = require('hapi')

const server = Hapi.server({
  host: 'localhost',
  port: 8005
})

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

start()
