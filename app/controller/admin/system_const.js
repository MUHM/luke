'use strict';

const Controller = require('egg').Controller;

class SystemConstController extends Controller {
  async webConfig() {
    const { ctx } = this;
    const data = await ctx.service.systemConst.findAllByType('admin_config');
    ctx.body = {
      code: 200,
      data,
    };
  }
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      constKey: {
        [Op.substring]: search,
      },
    } : null;
    const systemConsts = await ctx.service.systemConst.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset());
    ctx.body = {
      code: 200,
      data: systemConsts,
    };
  }
  async show() {
    const { ctx } = this;
    const data = await ctx.service.systemConst.findById(ctx.params.id);
    ctx.body = {
      code: 200,
      data,
    };
  }
  async create() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.systemConst.create({
      constKey: model.constKey,
      constValue: model.constValue,
      type: model.type,
      remark: model.remark,
      createdBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '新增成功' };
  }
  async update() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.systemConst.update({
      id: ctx.params.id,
      constKey: model.constKey,
      constValue: model.constValue,
      type: model.type,
      remark: model.remark,
      updatedBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '修改成功' };
  }
  async destroy() {
    const { ctx } = this;
    await ctx.service.systemConst.destroy(ctx.params.id);
    ctx.body = { code: 200, message: '删除成功' };
  }
}

module.exports = SystemConstController;
