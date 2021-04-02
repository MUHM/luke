'use strict';

module.exports = onlyLogin => {
  return async (ctx, next) => {
    const token = ctx.header.token;
    const auth = await ctx.service.user.getUserByToken(token);
    if (!auth) {
      ctx.throw(401, '401 未登录');
    }
    const user = await ctx.service.user.findById(auth.user.id);
    ctx.user = user;
    if (!onlyLogin && user.username !== ctx.app.config.root) {
      const flag = await ctx.service.permission.checkRole(ctx._matchedRoute, ctx.method.toLowerCase(), user.id);
      if (!flag) {
        ctx.throw(403, '403 无权限被禁止');
      }
    }

    await next();
  };
};
