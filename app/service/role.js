'use strict';
const Service = require('egg').Service;

class RoleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.RoleModel = ctx.model.Role;
  }
  /**
  * 查询角色列表
  * @param {Object} [where] - 查询条件
  * @param {Integer} [limit] - limit
  * @param {Integer} [offset] - offset
  * @param {Array} [order] - order 默认[['created_at', 'DESC']]
  * @return {Promise} 角色列表
  */
  async findAllByPage(where, limit, offset, order = [[ 'createdAt', 'DESC' ]]) {
    const { RoleModel } = this;
    const result = await RoleModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
    return result;
  }
  /**
  * 根据id查询角色
  * @param {Integer} [id] - 角色id
  * @return {Promise} 角色
  */
  async findById(id) {
    const { RoleModel } = this;
    const result = await RoleModel.findByPk(id);
    if (!result) {
      throw new Error('未找到对应信息');
    }
    return result;
  }
  /**
  * 新增角色
  * @param {Object} [m] - 角色信息
  * @param {Array} [p] - 权限信息
  * @param {Array} [pm] - 菜单信息
  * @return {Promise} 角色
  */
  async create(m, p = [], pm = []) {
    const { ctx, RoleModel } = this;
    const t = await ctx.app.model.transaction();
    try {
      const role = await RoleModel.create(m, { transaction: t });
      if (!role) {
        throw new Error('角色信息错误');
      }
      await role.update(m, { transaction: t });
      await role.setPermissions(p, { transaction: t });
      await role.setModules(pm, { transaction: t });
      return await t.commit();
    } catch (e) {
      await t.rollback();
      throw new Error(e.message);
    }
  }
  /**
  * 修改角色
  * @param {Object} [m] - 角色信息
  * @param {Array} [p] - 权限信息
  * @param {Array} [pm] - 菜单信息
  * @return {Promise} 角色
  */
  async update(m, p = [], pm = []) {
    const { ctx } = this;
    const t = await ctx.app.model.transaction();
    try {
      const role = await ctx.service.role.findById(m.id);
      await role.update(m, { transaction: t });
      const permissions = await role.getPermissions();
      const modules = await role.getModules();
      await role.removePermissions(permissions, { transaction: t });
      await role.removeModules(modules, { transaction: t });
      await role.setPermissions(p, { transaction: t });
      await role.setModules(pm, { transaction: t });
      return await t.commit();
    } catch (e) {
      await t.rollback();
      throw new Error(e.message);
    }
  }
  /**
  * 根据id删除角色
  * @param {Integer} [id] - id
  * @return {Integer} 1
  */
  async destroy(id) {
    const { RoleModel } = this;
    const result = await RoleModel.destroy({
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

module.exports = RoleService;
