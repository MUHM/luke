'use strict';
const crypto = require('crypto');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'anakin',
      truename: 'anakin',
      password: crypto.createHash('md5').update('123456anakin').digest('hex'),
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
