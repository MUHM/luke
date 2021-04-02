'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('organizations', [{
      name: 'Jedi Order',
      contact: 'anakin',
      address: 'Jedi Temple',
      telphone: '',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('organizations', null, {});
  },
};
