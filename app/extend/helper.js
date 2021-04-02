'use strict';

module.exports = {
  isNull(str) {
    if (str === '' || str === null || str === undefined) {
      return true;
    }
    return false;
  },
  getLimit() {
    const { ctx, isNull } = this;
    return isNull(ctx.query.limit) ? null : parseInt(ctx.query.limit);
  },
  getOffset() {
    const { ctx, isNull } = this;
    return isNull(ctx.query.offset) ? null : parseInt(ctx.query.offset);
  },
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
};
