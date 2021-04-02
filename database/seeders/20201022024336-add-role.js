'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'Jedi',
      description: 'Jedi Kinght',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
