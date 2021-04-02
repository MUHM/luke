'use strict';

module.exports = onlyLogin => {
  return async (ctx, next) => {
    // const api = /^\/api.*$/.test(ctx._matchedRoute);
    const token = ctx.header.token;
    const auth = await ctx.service.user.getUserByToken(token);
    if (!auth) {
      ctx.status = 401;
      ctx.body = { code: 401, message: '401 未登录' };
      return;
    }
    const user = await ctx.service.user.findById(auth.user.id);
    ctx.user = user;
    if (!onlyLogin && user.username !== ctx.app.config.root) {
      const flag = await ctx.service.permission.checkRole(ctx._matchedRoute, ctx.method.toLowerCase(), user.id);
      if (!flag) {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: '403 无权限被禁止',
        };
        return;
      }
    }

    await next();
  };
};
