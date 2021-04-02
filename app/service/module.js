'use strict';
const Service = require('egg').Service;

class PermissionService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ModuleModel = ctx.model.Module;
    this.UserModel = ctx.model.User;
    this.RoleModel = ctx.model.Role;
  }
  /**
  * 查询模块列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 权限列表
  */
  async findAllByPage(where, limit, offset, order = [[ 'createdAt', 'DESC' ]]) {
    const { ModuleModel } = this;
    return await ModuleModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
  }
  /**
  * 根据id查询模块
  * @param {Integer} [id] - 模块id
  * @return {Promise} 模块信息
  */
  async findById(id) {
    const { ModuleModel } = this;
    const result = await ModuleModel.findByPk(id);
    if (!result) {
      throw new Error('未找到对应信息');
    }
    return result;
  }
  /**
  * 新增模块
  * @param {Object} [m] - 模块信息
  * @return {Promise} 模块
  */
  async create(m) {
    const { ModuleModel } = this;
    return await ModuleModel.create(m);
  }
  /**
  * 修改模块
  * @param {Object} [m] - 模块信息
  * @return {Promise} 模块
  */
  async update(m) {
    const { ctx } = this;
    const module = await ctx.service.module.findById(m.id);
    await module.update(m);
    return module;
  }
  /**
  * 根据id删除模块
  * @param {Integer} [id] - 模块id
  * @return {Integer} 1
  */
  async destroy(id) {
    const { ModuleModel } = this;
    const result = await ModuleModel.destroy({
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
  * 获取用户菜单列表
  * @param {Integer} [user_id] - 用户id
  * @param {String} [type] - 类型
  * @return {Promise} 菜单列表
  */
  async findUserMenu(user_id, type) {
    const { ModuleModel, UserModel, RoleModel } = this;
    return await ModuleModel.findAll({
      attributes: [ 'id', 'parentId', 'name', 'icon', 'path', 'sort' ],
      where: {
        type,
      },
      include: [{
        required: true,
        attributes: [],
        model: RoleModel,
        include: [{
          required: true,
          where: {
            id: user_id,
          },
          attributes: [],
          model: UserModel,
        }],
      }],
      distinct: true,
      order: [[ 'sort', 'ASC' ]],
    });
  }
}

module.exports = PermissionService;
