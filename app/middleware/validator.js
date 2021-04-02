'use strict';
/**
 * 校验中间件 暂时不用
 * @param {*} controller
 * @param {*} model
 */

module.exports = (controller, model) => {
  return async (ctx, next) => {
    if (controller && model) {
      if (!ctx.app.validator[controller] || !ctx.app.validator[controller][model]) {
        await next();
        return;
      }
      const { error, value } = ctx.validate(ctx.app.validator[controller][model], ctx.method === 'GET' ? ctx.query : ctx.request.body, false);
      if (error) {
        ctx.throw(error.message);
      }
      ctx.request.model = value;
    }
    await next();
  };
};
