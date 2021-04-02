'use strict';

const Controller = require('egg').Controller;

class ModuleController extends Controller {
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      [Op.or]: [{
        name: {
          [Op.substring]: search,
        },
      }, {
        path: {
          [Op.substring]: search,
        },
      }],
    } : null;
    const data = await ctx.service.module.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset());
    ctx.body = {
      code: 200,
      data,
    };
  }
  async show() {
    const { ctx } = this;
    const data = await ctx.service.module.findById(ctx.params.id);
    ctx.body = {
      code: 200,
      data,
    };
  }
  async create() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.module.create({
      parentId: model.parentId,
      name: model.name,
      description: model.description,
      type: model.type,
      path: model.path,
      icon: model.icon,
      sort: model.sort,
      createdBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '新增成功' };
  }
  async update() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.module.update({
      id: ctx.params.id,
      parentId: model.parentId,
      name: model.name,
      description: model.description,
      type: model.type,
      path: model.path,
      icon: model.icon,
      sort: model.sort,
      updatedBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '修改成功' };
  }
  async destroy() {
    const { ctx } = this;
    await ctx.service.module.destroy(ctx.params.id);
    ctx.body = { code: 200, message: '删除成功' };
  }
  async all() {
    const { ctx } = this;
    const data = await ctx.service.module.findAllByPage();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = ModuleController;
