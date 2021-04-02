'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('role_users', [{
      role_id: 1,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('role_users', null, {});
  },
};
