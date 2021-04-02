'use strict';

const Controller = require('egg').Controller;
class ProjectController extends Controller {
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      name: {
        [Op.substring]: search,
      },
    } : null;
    const projects = await ctx.service.project.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset());
    ctx.body = {
      code: 200,
      data: projects,
    };
  }
  async show() {
    const { ctx } = this;
    const data = await ctx.service.project.findById(ctx.params.id);
    ctx.body = {
      code: 200,
      data,
    };
  }
  async create() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.project.create({
      name: model.name,
      organizationId: model.organizationId,
      address: model.address,
      status: model.status,
      remark: model.remark,
      createdBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '新增成功' };
  }
  async update() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.project.update({
      id: ctx.params.id,
      name: model.name,
      organizationId: model.organizationId,
      address: model.address,
      remark: model.remark,
      updatedBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '修改成功' };
  }
  async destroy() {
    const { ctx } = this;
    await ctx.service.project.destroy(ctx.params.id);
    ctx.body = { code: 200, message: '删除成功' };
  }
  async all() {
    const { ctx } = this;
    const data = await ctx.service.project.findAllByPage();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = ProjectController;
