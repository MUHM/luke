'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const RolePermission = app.model.define('role_permission', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    roleId: INTEGER,
    permissionId: INTEGER,
  });

  return RolePermission;
};
