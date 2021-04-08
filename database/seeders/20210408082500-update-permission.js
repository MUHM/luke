'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const system_const_action = [{
      id: 28,
      name: '新增系统常量',
      description: '新增系统常量',
      type: '系统常量',
      url: '/api/admin/systemconst',
      method: 'post',
      area: 'admin',
      controller: 'systemConst',
      action: 'create',
      sort: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 29,
      name: '修改系统常量',
      description: '修改系统常量',
      type: '系统常量',
      url: '/api/admin/systemconst/:id',
      method: 'put',
      area: 'admin',
      controller: 'systemConst',
      action: 'update',
      sort: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 30,
      name: '删除系统常量',
      description: '删除系统常量',
      type: '系统常量',
      url: '/api/admin/systemconst/:id',
      method: 'delete',
      area: 'admin',
      controller: 'systemConst',
      action: 'destroy',
      sort: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 31,
      name: '系统常量列表',
      description: '系统常量列表',
      type: '系统常量',
      url: '/api/admin/systemconst',
      method: 'get',
      area: 'admin',
      controller: 'systemConst',
      action: 'index',
      sort: 4,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 32,
      name: '系统常量详情',
      description: '系统常量详情',
      type: '系统常量',
      url: '/api/admin/systemconst/:id',
      method: 'get',
      area: 'admin',
      controller: 'systemConst',
      action: 'show',
      sort: 5,
      created_at: new Date(),
      updated_at: new Date(),
    }];
    const admin_menu = [{
      id: 8,
      name: '系统常量',
      description: '系统常量',
      type: 'admin_menu',
      icon: 'lock',
      path: '/systemconst',
      sort: 8,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 9,
      name: '系统设置',
      description: '系统设置',
      type: 'admin_menu',
      icon: 'set',
      sort: 8,
      created_at: new Date(),
      updated_at: new Date(),
    }];
    const role_permissions = [];
    for (let i = 28; i < 33; i++) {
      role_permissions.push({
        role_id: 1,
        permission_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('permissions', [
        ...system_const_action,
      ], { transaction });
      await queryInterface.bulkInsert('modules', [
        ...admin_menu,
      ], { transaction });
      await queryInterface.bulkInsert('role_permissions', role_permissions, { transaction });
      await transaction.commit();
      // 事务后处理
      await queryInterface.bulkUpdate('modules', {
        parent_id: 9,
      }, {
        id: { [Sequelize.Op.in]: [4, 5, 6, 7, 8] },
      });
      await queryInterface.bulkInsert('role_modules', [{
        role_id: 1,
        module_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        role_id: 1,
        module_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      }]);
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate('modules', {
        parent_id: null,
      }, {
        id: { [Sequelize.Op.in]: [4, 5, 6, 7, 8] },
      }, { transaction });
      await queryInterface.bulkDelete('permissions', { id: { [Sequelize.Op.gte]: 28 } }, { transaction });
      await queryInterface.bulkDelete('modules', { id: 8 }, { transaction });
      await queryInterface.bulkDelete('role_modules', { module_id: { [Sequelize.Op.in]: [8, 9] } }, { transaction });
      await queryInterface.bulkDelete('role_permissions', { permission_id: { [Sequelize.Op.gte]: 28 } }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    return;
  },
};
