'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Permission = app.model.define('permission', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    name: {
      type: STRING,
    },
    description: {
      type: STRING,
    },
    type: {
      type: STRING,
    },
    url: {
      type: STRING,
    },
    method: {
      type: STRING,
    },
    area: {
      type: STRING,
    },
    controller: {
      type: STRING,
    },
    action: {
      type: STRING,
    },
    sort: {
      type: INTEGER,
    },
  });

  Permission.associate = () => {
    Permission.belongsToMany(app.model.Role, {
      through: {
        model: app.model.RolePermission,
        unique: false,
      },
      foreignKey: 'permission_id',
    });
  };

  return Permission;
};
