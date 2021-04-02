'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const SystemConst = app.model.define('system_const', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    constKey: {
      allowNull: false,
      type: STRING,
    },
    constValue: {
      allowNull: false,
      type: TEXT,
    },
    type: {
      type: STRING,
    },
    remark: {
      type: STRING,
    },
    createdBy: {
      type: INTEGER,
    },
    updatedBy: {
      type: INTEGER,
    },
  });

  return SystemConst;
};
