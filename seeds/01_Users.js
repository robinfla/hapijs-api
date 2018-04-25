
exports.seed = function(knex, Promise) {
  const tableName = 'users';

  const rows = [
    {
      firstName: 'Robin',
      lastName: 'Flamant',
      email: 'robin@example.com',
      password: 'password1',
      userId: '6a72fa0c-7586-4283-bd3c-935b01fff01e',
      created_at: '2018-04-20 18:10:00',
    },
    {
      firstName: 'Alexis',
      lastName: 'Ohayon',
      email: 'alexis@example.com',
      password: 'password2',
      userId: '7001275f-8314-4cef-8f35-ffc8c43d63c4',
      created_at: '2018-04-23 15:00:00',
    }
  ];

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(() => {
      // Inserts seed entries
      return knex.insert(rows).into(tableName);
    });
};
