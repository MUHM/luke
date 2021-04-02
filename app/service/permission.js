'use strict';
const Service = require('egg').Service;

class PermissionService extends Service {
  constructor(ctx) {
    super(ctx);
    this.PermissionModel = ctx.model.Permission;
    this.UserModel = ctx.model.User;
    this.RoleModel = ctx.model.Role;
  }
  /**
  * 查询权限列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 权限列表
  */
  async findAllByPage(where, limit, offset, order = [['createdAt', 'DESC']]) {
    const { PermissionModel } = this;
    return await PermissionModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
  }
  /**
  * 根据url,method,user_id查询是否有权限
  * @param {String} [url] - url
  * @param {String} [method] - method
  * @param {Integer} [user_id] - user_id
  * @return {Boolean} true/flase
  */
  async checkRole(url, method, user_id) {
    const { PermissionModel, UserModel, RoleModel } = this;
    const count = await PermissionModel.count({
      where: {
        url,
        method,
      },
      include: [{
        required: true,
        model: RoleModel,
        include: [{
          required: true,
          where: {
            id: user_id,
          },
          model: UserModel,
        }],
      }],
      distinct: true,
    });
    return count !== 0;
  }
}

module.exports = PermissionService;
