'use strict';
const Service = require('egg').Service;

class ImgCodeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.prefix = 'login:';
    this.redis = ctx.app.redis.get('imgcode');
    this.svgCaptcha = require('svg-captcha');
    this.exTime = 120;
  }
  create(imgToken, size = 5) {
    const { svgCaptcha, redis, exTime, prefix, ctx } = this;
    const captcha = svgCaptcha.create({
      size, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: ctx.locals.moment().milliseconds() > 500 ? 1 : 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: `#${Math.floor(Math.random() * 0xffffff).toString(16)}`, // 验证码图片背景颜色
    });
    // 不需要等待
    redis.set(`${prefix}${imgToken}`, captcha.text, 'EX', exTime);
    return captcha;
  }
  createMath(imgToken) {
    const { svgCaptcha, redis, exTime, prefix } = this;
    const captcha = svgCaptcha.createMathExpr({
      mathMin: 0,
      mathMax: 50,
      mathOperator: '+/-',
    });
    // 不需要等待
    redis.set(`${prefix}${imgToken}`, captcha.text, 'EX', exTime);
    return captcha;
  }
  async check(imgToken, text) {
    const { redis, prefix } = this;
    const right = await redis.get(`${prefix}${imgToken}`);
    return right === text + '';
  }
}

module.exports = ImgCodeService;
