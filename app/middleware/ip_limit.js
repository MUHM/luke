'use strict';
const RateLimiter = require('async-ratelimiter');

module.exports = () => {
  return async (ctx, next) => {
    const redis = ctx.app.redis.get('core');
    const ip = ctx.ip;
    const rateLimiter = new RateLimiter({
      db: redis,
      namespace: 'ip',
    });
    const limit = await rateLimiter.get({
      id: `${ip}:${ctx._matchedRoute}`,
      max: Number(ctx.locals.core.ipLimitMax || 10),
      duration: Number(ctx.locals.core.ipLimitDuration) || 1000,
    });
    if (!limit.remaining) {
      // TODO 达到某条件时加入黑名单
      ctx.throw(429, ctx.locals.core.ipLimitMsg || 'Wocao your problem?');
    }
    await next();
  };
};
