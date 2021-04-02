'use strict';

const Controller = require('egg').Controller;

class PermissionController extends Controller {
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      name: {
        [Op.substring]: search,
      },
    } : null;
    const data = await ctx.service.permission.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset());
    ctx.body = {
      code: 200,
      data,
    };
  }
  async all() {
    const { ctx } = this;
    const data = await ctx.service.permission.findAllByPage();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = PermissionController;
