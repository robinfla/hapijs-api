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

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Flight = require('./Flight');

    return {
      flights: {
        relation: Model.HasOneRelation,
        modelClass: Flight,
        join: {
          from: 'users.id',
          to: 'flights.userId'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password', 'created_at'],
      properties: {
        firstName: {type: 'string', minLength: 1, maxLength: 255},
        lastName: {type: 'string', minLength: 1, maxLength: 255},
        email: {type: 'string'},
        password: {type: 'string'},
      }
    };
  }
}
module.exports = User;
