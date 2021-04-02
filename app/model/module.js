'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Module = app.model.define('module', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    parentId: {
      type: INTEGER,
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
    path: {
      type: STRING,
    },
    icon: {
      type: STRING,
    },
    sort: {
      type: INTEGER,
    },
  });

  Module.associate = () => {
    Module.belongsToMany(app.model.Role, {
      through: {
        model: app.model.RoleModule,
        unique: false,
      },
      foreignKey: 'module_id',
    });
  };

  return Module;
};
