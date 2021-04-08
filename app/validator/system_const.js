'use strict';

module.exports = app => {
  const Joi = app.Joi;
  return {
    create: Joi.object().keys({
      constKey: Joi.string().label('Key').required(),
      constValue: Joi.string().label('Value').required(),
    }),
    update: Joi.object().keys({
      constKey: Joi.string().label('Key').required(),
      constValue: Joi.string().label('Value').required(),
    }),
  };
};
