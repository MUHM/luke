'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    username: {
      unique: true,
      allowNull: false,
      type: STRING,
    },
    truename: {
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
    status: {
      allowNull: false,
      defaultValue: 1,
      type: INTEGER,
    },
    createdBy: {
      type: INTEGER,
    },
    updatedBy: {
      type: INTEGER,
    },
  });

  User.associate = () => {
    User.belongsToMany(app.model.Role, {
      through: {
        model: app.model.RoleUser,
        unique: false,
      },
      foreignKey: 'user_id',
    });
  };

  return User;
};
