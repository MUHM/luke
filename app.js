'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    app.locals.moment = require('moment');
    await app.runSchedule('app_locals');
  });
};
