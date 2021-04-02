'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const RoleUser = app.model.define('role_user', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    roleId: INTEGER,
    userId: INTEGER,
  });

  return RoleUser;
};
