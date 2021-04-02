'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Organization = app.model.define('organization', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    partentId: {
      type: INTEGER,
    },
    name: {
      type: STRING,
    },
    contact: {
      type: STRING,
    },
    telphone: {
      type: STRING,
    },
    address: {
      type: STRING,
    },
    sort: {
      type: INTEGER,
    },
    createdBy: {
      type: INTEGER,
    },
    updatedBy: {
      type: INTEGER,
    },
  });

  Organization.associate = () => {
  };

  return Organization;
};
