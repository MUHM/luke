'use strict';
const Service = require('egg').Service;

class OrganizationService extends Service {
  constructor(ctx) {
    super(ctx);
    this.OrganizationModel = ctx.model.Organization;
  }
  /**
  * 查询组织列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 组织列表
  */
  async findAllByPage(where, limit, offset, order = [[ 'createdAt', 'DESC' ]]) {
    const { OrganizationModel } = this;
    const result = await OrganizationModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
    return result;
  }
  /**
  * 根据id查询组织
  * @param {Integer} [id] - 组织id
  * @return {Promise} 组织信息
  */
  async findById(id) {
    const { OrganizationModel } = this;
    const result = await OrganizationModel.findByPk(id);
    if (!result) {
      throw new Error('未找到对应信息');
    }
    return result;
  }
  /**
  * 新增组织
  * @param {Object} [m] - 组织信息
  * @return {Promise} 组织
  */
  async create(m) {
    const { OrganizationModel } = this;
    return await OrganizationModel.create(m);
  }
  /**
  * 修改组织
  * @param {Object} [m] - 组织信息
  * @return {Promise} 组织
  */
  async update(m) {
    const { ctx } = this;
    const organization = await ctx.service.organization.findById(m.id);
    await organization.update(m);
    return organization;
  }
  /**
  * 根据id删除组织
  * @param {Integer} [id] - id
  * @return {Integer} 1
  */
  async destroy(id) {
    const { OrganizationModel } = this;
    const result = await OrganizationModel.destroy({
      where: {
        id,
      },
    });
    if (result !== 1) {
      throw new Error('删除失败');
    }
    return result;
  }
}

module.exports = OrganizationService;
