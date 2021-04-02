'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Project = app.model.define('project', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    organizationId: {
      allowNull: false,
      type: INTEGER,
    },
    name: {
      type: STRING,
    },
    address: {
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

  Project.associate = () => {
    Project.belongsTo(app.model.Organization, {
      as: 'organization',
      targetKey: 'id',
      foreignKey: 'organizationId',
    });
  };

  return Project;
};
