'use strict';

const Transport = require('egg-logger').Transport;
class LogsTransport extends Transport {
  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    console.log(msg);
  }
}

module.exports = LogsTransport;
