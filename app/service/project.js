'use strict';
const Service = require('egg').Service;

class ProjectService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ProjectModel = ctx.model.Project;
    this.OrganizationModel = ctx.model.Organization;
  }
  /**
  * 查询项目列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 项目列表
  */
  async findAllByPage(where, limit, offset, order = [['createdAt', 'DESC']]) {
    const { ProjectModel, OrganizationModel } = this;
    const result = await ProjectModel.findAndCountAll({
      where,
      include: [{ model: OrganizationModel, as: 'organization' }],
      order,
      limit,
      offset,
    });
    return result;
  }
  /**
  * 根据id查询项目
  * @param {Integer} [id] - 项目id
  * @return {Promise} 单循信息
  */
  async findById(id) {
    const { ProjectModel } = this;
    const result = await ProjectModel.findByPk(id);
    if (!result) {
      throw new Error('未找到对应信息');
    }
    return result;
  }
  /**
  * 新增项目
  * @param {Object} [m] - 项目信息
  * @return {Promise} 项目
  */
  async create(m) {
    const { ProjectModel } = this;
    return await ProjectModel.create(m);
  }
  /**
  * 修改项目
  * @param {Object} [m] - 项目信息
  * @return {Promise} 项目
  */
  async update(m) {
    const { ctx } = this;
    const project = await ctx.service.project.findById(m.id);
    await project.update(m);
    return project;
  }
  /**
  * 根据id删除项目
  * @param {Integer} [id] - id
  * @return {Integer} 1
  */
  async destroy(id) {
    const { ProjectModel } = this;
    const result = await ProjectModel.destroy({
      where: {
        id,
      },
    });
    if (result !== 1) {
      throw new Error('删除失败');
    }
    return result;
  }
  /**
  * 查询项目列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 项目列表
  */
  async findAll(where, limit, offset, order = [['createdAt', 'DESC']]) {
    const { ProjectModel } = this;
    const result = await ProjectModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
    return result;
  }
}

module.exports = ProjectService;
