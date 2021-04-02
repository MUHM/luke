'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      name: {
        [Op.substring]: search,
      },
    } : null;
    const roles = await ctx.service.role.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset());
    ctx.body = {
      code: 200,
      data: roles,
    };
  }
  async show() {
    const { ctx } = this;
    const role = await ctx.service.role.findById(ctx.params.id);
    const permissions = await role.getPermissions();
    const modules = await role.getModules();
    ctx.body = {
      code: 200,
      data: { role, permissions, modules },
    };
  }
  async create() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.role.create({
      name: model.name,
      description: model.description,
      createdBy: ctx.user.id,
    }, model.permissions, model.modules);
    ctx.body = { code: 200, message: '新增成功' };
  }
  async update() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.role.update({
      id: ctx.params.id,
      name: model.name,
      description: model.description,
      updatedBy: ctx.user.id,
    }, model.permissions, model.modules);
    ctx.body = { code: 200, message: '修改成功' };
  }
  async destroy() {
    const { ctx } = this;
    await ctx.service.role.destroy(ctx.params.id);
    ctx.body = { code: 200, message: '删除成功' };
  }
  async all() {
    const { ctx } = this;
    const data = await ctx.service.role.findAllByPage();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = RoleController;
