exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('users', function(usersTable) {
      usersTable.increment();

      usersTable.string('firstName', 50).notNullable();
      usersTable.string('lastName', 50).notNullable();
      usersTable.string('email', 250).notNullable().unique();
      usersTable.string('password', 128).notNullable();
      usersTable.string('guid', 50).notNullable().unique();
      usersTable.timestamp('created_at').notNullable();
    })
    .createTable('flights', function(flightsTable) {
      flightsTable.increment();
      flightsTable.string('owner', 36).references('guid').inTable('users');

      flightsTable.string('origin', 3).notNullable();
      flightsTable.string('destination', 3).notNullable();
      flightsTable.decimal('price').notNullable();
      flightsTable.integer('seatsAvailable').notNullable();
      flightsTable.enu('status', ['OPEN', 'CLOSED', 'CANCELLED']);
      flightsTable.string('guid', 36).notNullable().unique();
      flightsTable.timestamp('created_at').notNullable();
    })
    .createTable('bookings', function(bookingsTable) {
      bookingsTable.increment();
      bookingsTable.string('owner', 36).references('guid').inTable('flights');

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
