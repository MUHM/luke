'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async login() {
    const { ctx } = this;
    const { model } = ctx.request;
    const imgResult = await ctx.service.imgCode.check(model.imgToken, model.imgCode);
    if (!imgResult && this.app.env !== 'local') {
      throw new Error('验证码错误');
    }
    const data = await ctx.service.user.login(model.username, model.password);
    ctx.body = {
      code: 200,
      data,
    };
  }
  async password() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.user.updatePassword(ctx.user.id, model.oldPwd, model.newPwd, model.confirmPwd);
    ctx.body = {
      code: 200,
      message: '修改成功',
    };
  }
  async adminmenu() {
    const { ctx } = this;
    const data = await ctx.service.module.findUserMenu(ctx.user.id, 'admin_menu');
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = AccountController;
