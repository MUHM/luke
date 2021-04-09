'use strict';

const Controller = require('egg').Controller;

class WeiboController extends Controller {
  async weiboTimeHot() {
    const { ctx } = this;
    const data = await ctx.service.crawler.weiboTimeHot();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async zhihuHot() {
    const { ctx } = this;
    const data = await ctx.service.crawler.zhihuHot();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async v2exHot() {
    const { ctx } = this;
    const data = await ctx.service.crawler.v2exHot();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async tiebaTopic() {
    const { ctx } = this;
    const data = await ctx.service.crawler.tiebaTopic();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async doubanExplore() {
    const { ctx } = this;
    const data = await ctx.service.crawler.doubanExplore();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async tianyaHot() {
    const { ctx } = this;
    const data = await ctx.service.crawler.tianyaHot();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async githubTrending() {
    const { ctx } = this;
    const data = await ctx.service.crawler.githubTrending();
    ctx.body = {
      code: 200,
      data,
    };
  }
  async neteaseTop() {
    const { ctx } = this;
    const data = await ctx.service.crawler.neteaseTop();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = WeiboController;
