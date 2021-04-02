'use strict';
const Service = require('egg').Service;
const crypto = require('crypto');
const uuid = require('node-uuid');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.exTime = 3600 * 24;
    this.passwordSecret = ctx.app.config.passwordSecret;
    this.passwordDefault = ctx.app.config.passwordDefault;
    this.prefix = 'user:';
    this.redis = ctx.app.redis.get('user');
    this.UserModel = ctx.model.User;
  }
  /**
  * 新增用户
  * @param {Object} [m] - 用户信息(用户信息中的password请勿加密)
  * @param {Array} [r] - 角色list
  * @return {Promise} 用户
  */
  async create(m, r) {
    const { ctx, _getHash, passwordDefault, passwordSecret, UserModel } = this;
    m.password = _getHash(m.password || passwordDefault, passwordSecret);
    const t = await ctx.app.model.transaction();
    try {
      const isExist = await UserModel.findOne({ where: { username: m.username } });
      if (isExist) {
        throw new Error('账号已存在');
      }
      const user = await UserModel.create(m, { transaction: t });
      await user.setRoles(r, { transaction: t });
      return await t.commit();
    } catch (e) {
      await t.rollback();
      throw new Error(e.message);
    }
  }
  /**
  * 修改用户及角色
  * @param {Object} [m] - 用户信息
  * @param {Array} [r] - 角色信息
  * @return {Promise} 用户
  */
  async updateUserAndRole(m, r) {
    const { ctx, UserModel } = this;
    const t = await ctx.app.model.transaction();
    try {
      const user = await ctx.service.user.findById(m.id);
      if (m.username && user.username !== m.username) {
        const isExist = await UserModel.findOne({ where: { username: m.username } });
        if (isExist) {
          throw new Error('账号已存在');
        }
      }
      await user.update(m, { transaction: t });
      const roles = await user.getRoles();
      await user.removeRoles(roles, { transaction: t });
      await user.setRoles(r, { transaction: t });
      return await t.commit();
    } catch (e) {
      await t.rollback();
      throw new Error(e.message);
    }
  }
  /**
   * 登录
   * @param {String} [username] - 账号
   * @param {String} [password] - 密码
   * @return {Promise} 用户
   */
  async login(username, password) {
    const { _getHash, exTime, passwordSecret, prefix, redis, UserModel } = this;
    // 根据账号查用户
    const user = await UserModel.findOne({ where: { username } });
    // 用户不存在
    if (!user) {
      throw new Error('用户不存在');
    }
    // 检查用户状态
    if (user.status !== 1) {
      throw new Error('账号被注销');
    }
    // 检查用户密码
    if (user.password !== _getHash(password, passwordSecret)) {
      throw new Error('密码有误');
    }
    const token = uuid.v4();
    const result = {
      token, user: {
        id: user.id,
        username: user.username,
        truename: user.truename,
      },
    };
    redis.set(`${prefix}token:${token}`, JSON.stringify(result), 'EX', exTime);
    return result;
  }
  /**
   * 查询用户列表
   * @param {Object} [where] - 查询条件
   * @param {Integer} [limit] - limit
   * @param {Integer} [offset] - offset
   * @param {Array} [order] - order 默认[['created_at', 'DESC']]
   * @return {Promise} 用户列表
   */
  async findAllByPage(where, limit, offset, order = [[ 'createdAt', 'DESC' ]]) {
    const { UserModel, ctx } = this;
    return await UserModel.findAndCountAll({
      where,
      include: [{
        attributes: [ 'name' ],
        model: ctx.app.model.Role,
        through: {
          attributes: [ 'roleId' ],
        },
      }],
      distinct: true,
      order,
      limit,
      offset,
    });
  }
  /**
   * 根据id查找
   * @param {Integer} [id] - 账号
   * @return {Promise} 用户
   */
  async findById(id) {
    const { UserModel } = this;
    const result = await UserModel.findByPk(id);
    if (!result) {
      throw new Error('未找到对应信息');
    }
    return result;
  }
  /**
   * 根据id修改密码
   * @param {Integer} [id] - 账号
   * @param {String} [oldPwd] - oldPwd
   * @param {String} [newPwd] - newPwd
   * @param {String} [confirmPwd] - confirmPwd
   * @return {Promise} 用户
   */
  async updatePassword(id, oldPwd, newPwd, confirmPwd) {
    const { _getHash, passwordSecret, UserModel } = this;
    const user = await UserModel.findByPk(id);
    if (confirmPwd !== newPwd || newPwd === null || newPwd === '') {
      throw new Error('两次输入的密码不一致');
    }
    if (_getHash(oldPwd, passwordSecret) !== user.password) {
      throw new Error('密码有误');
    }
    await user.update({
      password: _getHash(newPwd, passwordSecret),
    });
    return user;
  }
  /**
   * 根据id重置密码
   * @param {Integer} [id] - 账号
   * @return {Promise} 用户
   */
  async resetPassword(id) {
    const { _getHash, passwordDefault, passwordSecret, UserModel } = this;
    const user = await UserModel.findByPk(id);
    await user.update({
      password: _getHash(passwordDefault, passwordSecret),
    });
    return user;
  }
  /**
   * 根据token获取用户信息
   * @param {string} token -token
   */
  async getUserByToken(token) {
    const { redis, prefix } = this;
    const result = await redis.get(`${prefix}token:${token}`);
    if (result) {
      return JSON.parse(result);
    }
    return result;
  }
  /**
   * 获取password的hash值
   * @param {String} password -password
   * @param {String} passwordSecret -passwordSecret
   */
  _getHash(password, passwordSecret) {
    return crypto.createHash('md5').update(password + passwordSecret).digest('hex');
  }
}

module.exports = UserService;
