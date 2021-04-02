'use strict';
const regExp = require('../../lib/utils/regExp');

module.exports = app => {
  const Joi = app.Joi;
  return {
    login: Joi.object().keys({
      username: Joi.string().pattern(regExp.account).required()
        .error(new Error('用户名不符合验证规则')),
      password: Joi.string().label('密码').required(),
      imgToken: Joi.string().required(),
      imgCode: Joi.string().label('图形验证码').required(),
    }),
    password: Joi.object().keys({
      oldPwd: Joi.string().label('原密码').required(),
      newPwd: Joi.string().label('新密码').pattern(regExp.password)
        .required(),
      confirmPwd: Joi.string().label('新密码').pattern(regExp.password)
        .required(),
    }),
  };
};
