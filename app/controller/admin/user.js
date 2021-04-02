'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      [Op.or]: [{
        truename: {
          [Op.substring]: search,
        },
      }, {
        username: {
          [Op.substring]: search,
        },
      }],
    } : null;
    const data = await ctx.service.user.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset());
    ctx.body = {
      code: 200,
      data,
    };
  }
  async show() {
    const { ctx } = this;
    const user = await ctx.service.user.findById(ctx.params.id);
    const roles = await user.getRoles();
    ctx.body = {
      code: 200,
      data: { user, roles },
    };
  }
  async create() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.user.create({
      username: model.username,
      truename: model.truename,
      // password: model.password,
      createdBy: ctx.user.id,
    }, model.roles);
    ctx.body = { code: 200, message: '新增成功' };
  }
  async update() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.user.updateUserAndRole({
      id: ctx.params.id,
      username: model.username,
      truename: model.truename,
      password: model.password,
      status: model.status,
      updatedBy: ctx.user.id,
    }, model.roles);
    ctx.body = { code: 200, message: '修改成功' };
  }
  async destroy() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      message: '暂时不提供本功能',
    };
  }
  async reset() {
    const { ctx } = this;
    await ctx.service.user.resetPassword(ctx.params.id);
    ctx.body = { code: 200, message: '密码重置成功' };
  }
}

module.exports = UserController;
