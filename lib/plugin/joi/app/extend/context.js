'use strict';
const Joi = require('@hapi/joi');

module.exports = {

  validate(schema, data, options, autoThrow) {
    if (!schema || !Joi.isSchema(schema)) {
      this.throw(422, 'Schema is missing');
    }
    if (typeof data === 'boolean') {
      autoThrow = data;
      data = null;
      options = { allowUnknown: true };
    }
    if (typeof options === 'boolean') {
      autoThrow = options;
      options = { allowUnknown: true };
    }

    data = data || this.request.body;
    const config = this.app.config || {};
    const locale = (this.__getLocale && this.__getLocale()) || (config.i18n && config.i18n.defaultLocale);

    if (locale && config.joi && config.joi.locale) {
      options.messages = config.joi.locale[locale.toLowerCase()] || {};
    }

    let _autoThrow = true;
    if (typeof autoThrow === 'boolean') {
      _autoThrow = autoThrow;
    } else if (config.joi && typeof config.joi.throw === 'boolean') {
      _autoThrow = config.joi.throw;
    }
    let { error, value } = schema.validate(data, options);

    if (_autoThrow && error) {
      if (typeof config.joi.throwHandle === 'function') {
        error = config.joi.throwHandle(error);
      }
      this.throw(422, error);
    }

    if (error && typeof config.joi.errorHandle === 'function') {
      error = config.joi.errorHandle(error);
    }

    let result = { error, value };

    if (typeof config.joi.resultHandle === 'function') {
      result = config.joi.resultHandle(result);
    }
    return result;
  },
};
