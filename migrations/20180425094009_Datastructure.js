exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('users', function(usersTable) {
      usersTable.increments();

      usersTable.string('firstName', 50).notNullable();
      usersTable.string('lastName', 50).notNullable();
      usersTable.string('email', 250).notNullable().unique();
      usersTable.string('password', 128).notNullable();
      usersTable.string('userId', 50).notNullable().unique();
      usersTable.timestamp('created_at').notNullable();
    })
    .createTable('flights', function(flightsTable) {
      flightsTable.increments();
      flightsTable.string('userId', 36).references('userId').inTable('users');

      flightsTable.string('origin', 3).notNullable();
      flightsTable.string('destination', 3).notNullable();
      flightsTable.decimal('price').notNullable();
      flightsTable.integer('seatsAvailable').notNullable();
      flightsTable.enu('status', ['OPEN', 'CLOSED', 'CANCELLED']);
      flightsTable.string('flightId', 36).notNullable().unique();
      flightsTable.timestamp('created_at').notNullable();
    })
    .createTable('bookings', function(bookingsTable) {
      bookingsTable.increments();
      bookingsTable.string('flightId', 36).references('flightId').inTable('flights');
      bookingsTable.string('firstName', 50).notNullable();
      bookingsTable.string('lastName', 50).notNullable();
      bookingsTable.string('email', 250).notNullable();
      bookingsTable.decimal('price').notNullable();
      bookingsTable.integer('seats').notNullable();
      bookingsTable.timestamp('created_at').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTableIfExists('bookings')
    .dropTableIfExists('flights')
    .dropTableIfExists('users');
};
