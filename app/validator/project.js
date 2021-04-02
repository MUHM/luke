'use strict';
// const regExp = require('../../lib/utils/regExp');

module.exports = app => {
  const Joi = app.Joi;
  return {
    create: Joi.object().keys({
      name: Joi.string().label('项目名称').required(),
      organizationId: Joi.number().label('所属组织').required(),
    }),
    update: Joi.object().keys({
      name: Joi.string().label('单位名称').required(),
      organizationId: Joi.number().label('所属组织').required(),
    }),
  };
};
