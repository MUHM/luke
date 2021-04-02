'use strict';
// const regExp = require('../../lib/utils/regExp');

module.exports = app => {
  const Joi = app.Joi;
  return {
    create: Joi.object().keys({
      name: Joi.string().label('角色名称').required(),
      permissions: Joi.array().error(new Error('接口权限不符合验证规则')),
      modules: Joi.array().error(new Error('菜单权限不符合验证规则')),
    }),
    update: Joi.object().keys({
      name: Joi.string().label('角色名称').required(),
      permissions: Joi.array().error(new Error('接口权限不符合验证规则')),
      modules: Joi.array().error(new Error('菜单权限不符合验证规则')),
    }),
  };
};
