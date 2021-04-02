'use strict';
const zh_cn = require('./locale/zh-CN');

exports.joi = {
  options: {},
  locale: {
    'zh-cn': zh_cn,
  },
  throw: true,
  throwHandle: error => {
    // console.log(error);
    return error;
  },
  errorHandle: error => {
    // console.log(error);
    return error;
  },
  resultHandle: result => {
    // console.log(result);
    return result;
  },
};
