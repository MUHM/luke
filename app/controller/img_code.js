'use strict';

const Controller = require('egg').Controller;

class ImgCodeController extends Controller {
  async index() {
    const { ctx } = this;
    const captcha = ctx.service.imgCode.createMath(ctx.params.random);
    ctx.type = 'svg';
    ctx.body = captcha.data;
  }
}

module.exports = ImgCodeController;
