'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const RoleModule = app.model.define('role_module', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    roleId: INTEGER,
    moduleId: INTEGER,
  });

  return RoleModule;
};
