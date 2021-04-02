'use strict';
// const regExp = require('../../lib/utils/regExp');

module.exports = app => {
  const Joi = app.Joi;
  return {
    create: Joi.object().keys({
      name: Joi.string().label('单位名称').required(),
      contact: Joi.string().label('联系人').required(),
    }),
    update: Joi.object().keys({
      name: Joi.string().label('单位名称').required(),
    }),
  };
};
