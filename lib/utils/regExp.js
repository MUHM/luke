'use strict';
module.exports = {
  userName: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
  mobile: /^1\d{10}$/,
  account: /^([a-zA-Z][a-zA-Z0-9_]{2,15})|(1\d{10})|((\w)+(\.\w+)*@(\w)+((\.\w+)+))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/,
};
