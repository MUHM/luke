'use strict';

module.exports = {
  up: async queryInterface => {
    const data = [{
      const_key: 'ipLimitMax',
      const_value: '10',
      type: 'core',
      remark: 'ip_limit配置',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      const_key: 'ipLimitDuration',
      const_value: '1000',
      type: 'core',
      remark: 'ip_limit配置',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      const_key: 'logo',
      const_value: 'https://cdn.ghostnova.com/logo.png',
      type: 'admin_config',
      remark: 'logo',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      const_key: 'copyright',
      const_value: 'copyright',
      type: 'admin_config',
      remark: 'copyright',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      const_key: 'title',
      const_value: '写着玩系统',
      type: 'admin_config',
      remark: 'title',
      created_at: new Date(),
      updated_at: new Date(),
    }];
    await queryInterface.bulkInsert('system_consts', data);
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('system_consts', null, {});
  },
};
