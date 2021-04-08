'use strict';
const Service = require('egg').Service;

class SystemConstService extends Service {
  constructor(ctx) {
    super(ctx);
    this.SystemConstModel = ctx.model.SystemConst;
  }
  /**
  * 根据类型查询系统常量
  * @param {String} [type] - 类型
  * @return {Promise} 常量信息
  */
  async findAllByType(type) {
    const { SystemConstModel } = this;
    return await SystemConstModel.findAll({
      attributes: ['constKey', 'constValue'],
      where: { type },
    });
  }
  /**
  * 根据类型查询系统常量
  * @param {String} [constKey] - key
  * @return {Promise} 常量信息
  */
  async findByconstKey(constKey) {
    const { SystemConstModel } = this;
    return await SystemConstModel.findOne({
      attributes: ['constValue'],
      where: { constKey },
    });
  }
  /**
  * 查询系统常量列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 系统常量列表
  */
  async findAllByPage(where, limit, offset, order = [['createdAt', 'DESC']]) {
    const { SystemConstModel } = this;
    const result = await SystemConstModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
    return result;
  }
  /**
  * 新增系统常量
  * @param {Object} [m] - 系统常量信息
  * @return {Promise} 系统常量
  */
  async create(m) {
    const { SystemConstModel } = this;
    return await SystemConstModel.create(m);
  }
  /**
  * 修改系统常量
  * @param {Object} [m] - 系统常量信息
  * @return {Promise} 系统常量
  */
  async update(m) {
    const { ctx } = this;
    const systemConst = await ctx.service.systemConst.findById(m.id);
    await systemConst.update(m);
    return systemConst;
  }
  /**
  * 根据id查询系统常量
  * @param {Integer} [id] - id
  * @return {Promise} 系统常量信息
  */
  async findById(id) {
    const { SystemConstModel } = this;
    const result = await SystemConstModel.findByPk(id);
    if (!result) {
      throw new Error('未找到对应信息');
    }
    return result;
  }
  /**
  * 根据id删除系统常量
  * @param {Integer} [id] - id
  * @return {Integer} 1
  */
  async destroy(id) {
    const { SystemConstModel } = this;
    const result = await SystemConstModel.destroy({
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

module.exports = SystemConstService;
