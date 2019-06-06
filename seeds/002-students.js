
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Hagrid', cohorts_id: 1},
        { name: 'Golem' , cohorts_id: 2},
        { name: 'Arya', cohorts_id: 3}
      ]);
    });
};
