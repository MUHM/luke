'use strict';

module.exports = {
  up: async queryInterface => {
    const admin_menu = [{
      id: 1,
      name: '首页',
      description: '后台首页',
      type: 'admin_menu',
      icon: 'dashboard',
      path: '/admin/home',
      sort: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 2,
      name: '组织管理',
      description: '后台',
      type: 'admin_menu',
      icon: 'chart-bar',
      path: '/admin/organization',
      sort: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 3,
      name: '项目管理',
      description: '后台',
      type: 'admin_menu',
      icon: 'edit',
      path: '/admin/project',
      sort: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 4,
      name: '用户管理',
      description: '后台',
      type: 'admin_menu',
      icon: 'account',
      path: '/admin/user',
      sort: 4,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 5,
      name: '角色管理',
      description: '后台',
      type: 'admin_menu',
      icon: 'atm',
      path: '/admin/role',
      sort: 5,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 6,
      name: '模块管理',
      description: '后台',
      type: 'admin_menu',
      icon: 'copy',
      path: '/admin/module',
      sort: 6,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      id: 7,
      name: '权限管理',
      description: '后台',
      type: 'admin_menu',
      icon: 'lock',
      path: '/admin/permission',
      sort: 8,
      created_at: new Date(),
      updated_at: new Date(),
    }];
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('modules', [ ...admin_menu ], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('modules', null, {});
  },
};
