'use strict'

const Joi = require('joi')
const Boom = require('boom')

exports.plugin = {
  name: 'lambda',
  version: '1.0.0',
  register: function (server, options) {
    server.route({
      method: 'POST',
      path: '/send',
      config: {
        handler: async function (req, h) {
          try {
          } catch (err) {
            return Boom.badImplementation(err)
          }
        },
        validate: {
          payload: {
            email: Joi.string().email().required()
          },
          failAction: (req, h, err) => err
        }
      }
    })
  }
}
