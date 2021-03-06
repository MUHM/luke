'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async app => {
  const { router, controller, model } = app;
  const authorize = app.middlewares.authorize();
  const authLogin = app.middlewares.authorize(true);
  // socket.io
  // io.of('/').route('exchange', io.controller.nsp.exchange);

  // router.get('/api/test', controller.proxy.index);
  // 图形验证码
  router.get('/api/imgcode/:random', controller.imgCode.index);
  // 外部接口-天气
  router.get('/api/weather', controller.external.weather.index);
  for (const item in controller.external.crawler) {
    router.get(`/api/crawler/${item.toLowerCase()}`, controller.external.crawler[item]);
  }
  // 基本信息
  router.get('/api/admin/systemconst/webconfig', controller.admin.systemConst.webConfig);

  // 个人
  router.post('/api/account/login', app.middleware.validator('account', 'login'), controller.account.login);
  router.post('/api/account/password', app.middleware.validator('account', 'password'), authLogin, controller.account.password);

  // 管理端
  router.get('/api/account/adminmenu', authLogin, controller.account.adminmenu);
  router.get('/api/admin/permission/all', authLogin, controller.admin.permission.all);
  router.get('/api/admin/module/all', authLogin, controller.admin.module.all);
  router.get('/api/admin/role/all', authLogin, controller.admin.role.all);
  router.get('/api/admin/organization/all', authLogin, controller.admin.organization.all);
  router.get('/api/admin/project/all', authLogin, controller.admin.project.all);

  const adminRouter = await model.Permission.findAll();
  adminRouter.forEach(element => {
    if (element.method) {
      let controllerAction = controller;
      if (element.area) {
        const areas = element.area.split('.');
        areas.forEach(area => {
          controllerAction = controllerAction[area];
        });
      }
      controllerAction = controllerAction[element.controller][element.action];
      router[element.method](element.url, app.middleware.validator(element.controller, element.action), authorize, controllerAction);
    }
  });

};
