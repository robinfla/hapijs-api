'use strict';

const { Model } = require('objection');

const Knex = require('knex') ({
  client: 'postgresql',
  useNullAsDefault: true,
  connection: {
    host:'citizen.cqa7huawo0be.eu-west-1.rds.amazonaws.com',
    database: 'citizen',
    user: 'robin',
    password: 'password'
  }
});

Model.knex(Knex);

class Flight extends Model {
  static get tableName() {
    return 'flights';
  }

  static get relationMappings() {
    const Booking = require('./Booking');
    const User = require('./User');

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'flights.userId',
          to: 'users.userId'
        }
      },

      bookings: {
        relation: Model.HasOneRelation,
        modelClass: Booking,
        join: {
          from: 'flights.flightId',
          to: 'bookings.flightId'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'origin', 'destination', 'price', 'seatsAvailable', 'status'],
      properties: {
        userId: {type: 'string'},
        origin: {type: 'string', minLength: 2, maxLenght: 3},
        destination: {type: 'string', minLength: 2, maxLenght: 3},
        price: {type: 'integer'},
        status: {type: 'string', enum: ['CLOSED', 'CANCELLED', 'OPEN']},
      }
    };
  }
}

module.exports = Flight;
