'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Role = app.model.define('role', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    name: STRING,
    description: STRING,
    createdBy: INTEGER,
    updatedBy: INTEGER,
  });

  Role.associate = () => {
    Role.belongsToMany(app.model.User, {
      through: {
        model: app.model.RoleUser,
        unique: false,
      },
      foreignKey: 'role_id',
    });
    Role.belongsToMany(app.model.Permission, {
      through: {
        model: app.model.RolePermission,
        unique: false,
      },
      foreignKey: 'role_id',
    });
    Role.belongsToMany(app.model.Module, {
      through: {
        model: app.model.RoleModule,
        unique: false,
      },
      foreignKey: 'role_id',
    });
  };

  return Role;
};
