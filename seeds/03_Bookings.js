exports.seed = function(knex, Promise) {
  const tableName = 'bookings';

  const rows = [
    {
      flightId: 'cc9e2120-61d7-42a4-9da1-8a8135af6b0b',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      price: 160,
      seats: 2,
      created_at: '2018-04-15 20:07:15'
    },
    {
      flightId: '6a72fa0c-7586-4283-bd3c-935b01fff01e',
      firstName: 'Jean-Michel',
      lastName: 'Michel',
      email: 'michel@michel.com',
      price: 80,
      seats: 1,
      created_at: '2018-04-23 23:09:15'
    },
    {
      flightId: '7001275f-8314-4cef-8f35-ffc8c43d63c4',
      firstName: 'Charles',
      lastName: 'Magne',
      email: 'charles@example.com',
      price: 180,
      seats: 3,
      created_at: '2018-04-03 19:19:15'
    },
    {
      flightId: '7001275f-8314-4cef-8f35-ffc8c43d63c4',
      firstName: 'Romeo',
      lastName: 'Montaigu',
      email: 'romeo@verone.com',
      price: 60,
      seats: 1,
      created_at: '2018-04-12 18:39:45'
    },
  ];

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(() => {
      // Inserts seed entries
      return knex.insert(rows).into(tableName);
    });
};
