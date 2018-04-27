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

class Bookings extend Model {
  static get tableName() {
    return 'bookings';
  }

  static get relationMappings() {
    const Flight = require('./Flight');

    return {
      flights: {
        relation: Model.BelongsToOneRelation,
        modelClass: Flight,
        join: {
          from: 'bookings.flightId',
          to: 'flights.flightId'
        }
      }
    };
  }

  static get jsonSchema() {
    type: 'object',
      required: ['flightId', 'firstName', 'lastName', 'email', 'price', 'seats'],
      properties: {
        flightId: {type: 'string'},
        firstName: {type: 'string', minLength: 1, maxLenght: 255},
        lastName: {type: 'string', minLength: 1, maxLenght: 255},
        email: {type: 'string'},
        price: {type: 'integer'},
        seats: {type: 'integer'}
      }
  }
}
