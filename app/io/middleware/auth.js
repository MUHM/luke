'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, helper, logger } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;

    // 用户信息
    const { room, token, truename } = query;
    const rooms = [room];
    const tick = (socketId, msg) => {
      // 踢出用户前发送消息
      socket.emit(socketId, helper.parseMsg('deny', msg));
      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      nsp.adapter.remoteDisconnect(id, true, err => {
        logger.error(err);
      });
    };
    // 用户认证
    const auth = await ctx.service.user.getUserByToken(token);
    if (!auth) {
      tick(id, {
        type: 'deleted',
        message: '401 未登录',
      });
      return;
    }
    const user = await ctx.service.user.findById(auth.user.id);
    if (user.truename !== truename) {
      tick(id, {
        type: 'deleted',
        message: '401 未登录',
      });
      return;
    }
    const old = await app.redis.get('user').get(`user:io:${user.id}`);
    if (old) {
      tick(old, {
        type: 'deleted',
        message: '异地登录',
      });
    }
    await app.redis.get('user').set(`user:io:${user.id}`, id);
    // 检查房间是否存在，不存在则踢出用户
    // const hasRoom = await app.redis.get('core').get(`${PREFIX}:${room}`);
    // if (!hasRoom) {
    //   tick(id, {
    //     type: 'deleted',
    //     message: 'deleted, room has been deleted.',
    //   });
    //   return;
    // }
    // 用户加入
    socket.join(room);
    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      const clientsDetail = [];
      clients.forEach(client => {
        const _client = app.io.sockets.sockets[client];
        const _query = _client.handshake.query;
        clientsDetail.push({
          socketId: client,
          truename: _query.truename,
        });
      });
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients: clientsDetail,
        action: 'join',
        target: 'participator',
        message: `User(${truename}) joined.`,
      });
    });

    await next();
    // 用户离开
    // await app.redis.get('user').del(`user:io:${user.id}`);
    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      const clientsDetail = [];
      clients.forEach(client => {
        const _client = app.io.sockets.sockets[client];
        const _query = _client.handshake.query;
        clientsDetail.push({
          socketId: client,
          truename: _query.truename,
        });
      });
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients: clientsDetail,
        action: 'leave',
        target: 'participator',
        message: `User(${truename}) leaved.`,
      });
    });

  };
};
