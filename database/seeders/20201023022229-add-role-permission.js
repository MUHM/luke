'use strict';

module.exports = {
  up: async queryInterface => {
    const data = [];
    for (let i = 1; i < 28; i++) {
      data.push({
        role_id: 1,
        permission_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('role_permissions', data);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('role_permissions', null, {});
  },
};
