/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: '/api/*',
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603258858098_284';

  // add your middleware config here
  config.middleware = ['errorHandle', 'ipLimit'];
  config.logger = {
    outputJSON: false,
  };
  config.proxy = true;
  // socket.io
  config.io = {
    init: { wsEngine: 'ws' }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: [],
      },
    },
    redis: {
      host: '10.10.1.9',
      port: 6379,
      auth_pass: '',
      db: 13,
    },
  };
  // database
  const database = {
    sequelize: {
      datasources: [
        {
          delegate: 'model',
          baseDir: 'model',
          dialect: 'postgres',
          username: 'root',
          password: 'root',
          database: 'luke',
          port: 5432,
          host: '10.10.1.9',
          timezone: '+08:00',
          logging: false,
          define: {
            underscored: true,
            paranoid: true,
            charset: 'utf8',
            dialectOptions: {
              collate: 'utf8_general_ci',
            },
            timestamps: true,
          },
        },
      ],
    },
    redis: {
      clients: {
        core: {
          port: 6379,
          host: '10.10.1.9',
          password: '',
          db: 13,
        },
        imgcode: {
          port: 6379,
          host: '10.10.1.9',
          password: '',
          db: 14,
        },
        user: {
          port: 6379,
          host: '10.10.1.9',
          password: '',
          db: 15,
        },
      },
    },
  };

  // add your user config here
  const userConfig = {
    root: 'anakin',
    i18n: {
      defaultLocale: 'zh-CN',
    },
    passwordDefault: '123456',
    passwordSecret: 'anakin',
  };

  return {
    ...config,
    ...database,
    ...userConfig,
  };
};
