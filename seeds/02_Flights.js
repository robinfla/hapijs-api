exports.seed = function(knex, Promise) {
  const tableName = 'flights';

  const rows = [
    {
      userId: '6a72fa0c-7586-4283-bd3c-935b01fff01e',
      origin: 'CDG',
      destination: 'HEL',
      price: 80,
      seatsAvailable: 30,
      status: 'OPEN',
      flightId: 'cc9e2120-61d7-42a4-9da1-8a8135af6b0b',
      created_at: '2018-04-12 11:43:30',
    },
    {
      userId: '7001275f-8314-4cef-8f35-ffc8c43d63c4',
      origin: 'LIS',
      destination: 'MAD',
      price: 60,
      seatsAvailable: 50,
      status: 'CLOSED',
      flightId: '29738b72-7d9c-4f59-9ff4-10d6855e2815',
      created_at: '2018-03-28 17:03:24',
    },
  ];

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(() => {
      // Inserts seed entries
      return knex.insert(rows).into(tableName);
    });
};
