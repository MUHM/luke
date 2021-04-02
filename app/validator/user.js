'use strict';
const regExp = require('../../lib/utils/regExp');

module.exports = app => {
  const Joi = app.Joi;
  return {
    create: Joi.object().keys({
      username: Joi.string().pattern(regExp.account).required()
        .error(new Error('用户名不符合验证规则')),
      truename: Joi.string().label('真实姓名').required(),
      roles: Joi.array().error(new Error('角色不符合验证规则')),
    }),
    update: Joi.object().keys({
      username: Joi.string().pattern(regExp.account).required()
        .error(new Error('用户名不符合验证规则')),
      truename: Joi.string().label('真实姓名').required(),
      roles: Joi.array().error(new Error('角色不符合验证规则')),
    }),
  };
};
