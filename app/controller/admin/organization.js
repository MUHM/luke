'use strict';

const Controller = require('egg').Controller;

class OrganizationController extends Controller {
  async index() {
    const { ctx } = this;
    const Op = ctx.app.Sequelize.Op;
    const search = ctx.query.search;
    const where = search ? {
      name: {
        [Op.substring]: search,
      },
    } : null;
    const organizations = await ctx.service.organization.findAllByPage(where, ctx.helper.getLimit(), ctx.helper.getOffset(), [[ 'sort', 'ASC' ]]);
    ctx.body = {
      code: 200,
      data: organizations,
    };
  }
  async show() {
    const { ctx } = this;
    const data = await ctx.service.organization.findById(ctx.params.id);
    ctx.body = {
      code: 200,
      data,
    };
  }
  async create() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.organization.create({
      name: model.name,
      partentId: model.partentId,
      contact: model.contact,
      telphone: model.telphone,
      address: model.address,
      sort: model.sort,
      createdBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '新增成功' };
  }
  async update() {
    const { ctx } = this;
    const { model } = ctx.request;
    await ctx.service.organization.update({
      id: ctx.params.id,
      name: model.name,
      partentId: model.partentId,
      contact: model.contact,
      telphone: model.telphone,
      address: model.address,
      sort: model.sort,
      updatedBy: ctx.user.id,
    });
    ctx.body = { code: 200, message: '修改成功' };
  }
  async destroy() {
    const { ctx } = this;
    await ctx.service.organization.destroy(ctx.params.id);
    ctx.body = { code: 200, message: '删除成功' };
  }
  async all() {
    const { ctx } = this;
    const data = await ctx.service.organization.findAllByPage();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = OrganizationController;
