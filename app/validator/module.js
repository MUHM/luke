'use strict';

module.exports = app => {
  const Joi = app.Joi;
  return {
    create: Joi.object().keys({
      name: Joi.string().label('模块名称').required(),
      type: Joi.string().label('类型').required(),
    }),
    update: Joi.object().keys({
      name: Joi.string().label('模块名称').required(),
      type: Joi.string().label('类型').required(),
    }),
  };
};
