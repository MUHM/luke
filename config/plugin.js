'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  joi: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/joi'),
  },
  io: {
    enable: false,
    package: 'egg-socket.io',
  },
};
