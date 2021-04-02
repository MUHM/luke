'use strict';
module.exports = app => {
  return {
    schedule: {
      // cron: '0 0 4 * * *', // 每天凌晨4:00执行一次
      interval: '1h',
      type: 'all', // all 指定所有的 worker 都需要执行 worker 随机一个 worker 执行
      // disable: app.config.env === 'local', // 本地开发环境不执行
    },
    async task(ctx) {
      try {
        const core = await ctx.model.SystemConst.findAll({ where: { type: 'core' } });
        if (core) {
          app.locals.core = {};
          core.forEach(element => {
            app.locals.core[element.constKey] = element.constValue;
          }, this);
        }
      } catch (e) {
        console.log(e);
      }
    },
  };
};
