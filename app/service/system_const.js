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
}

module.exports = SystemConstService;
