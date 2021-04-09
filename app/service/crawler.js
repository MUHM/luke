'use strict';
const Service = require('egg').Service;

class CrawlerService extends Service {
  constructor(ctx) {
    super(ctx);
    this.prefix = 'crawler:';
    this.redis = ctx.app.redis.get('core');
    this.exTime = ctx.locals.core.crawlerExTime || 1200;
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.68';
    this.cheerio = require('cheerio');
  }
  async weiboTimeHot() {
    const { userAgent, ctx, cheerio, exTime, prefix, redis } = this;
    const cacheKey = 'weibo:timehot';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: '微博热搜',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        host: 's.weibo.com',
        'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('https://s.weibo.com/top/summary?cate=realtimehot', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const resHtml = cheerio.load(result.data)('.td-02 a');
    for (let index = 0; index < resHtml.length; index++) {
      const element = resHtml[index];
      if (element.attribs.href.startsWith('/weibo')) {
        res.content.push({ href: `https://s.weibo.com${element.attribs.href}`, title: element.firstChild.data });
      }
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async zhihuHot() {
    const { ctx, exTime, prefix, redis } = this;
    const cacheKey = 'zhihu:hot';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: '知乎热榜',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        path: '/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true',
        'x-api-version': '3.0.76',
        'x-requested-with': 'fetch',
        // 'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const data = JSON.parse(result.data);
    for (let index = 0; index < data.data.length; index++) {
      const element = data.data[index];
      res.content.push({ href: element.target.link.url, title: element.target.title_area.text, image: element.target.image_area.url });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async v2exHot() {
    const { userAgent, ctx, cheerio, exTime, prefix, redis } = this;
    const cacheKey = 'v2ex:hot';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: 'V2EX',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        authority: 'www.v2ex.com',
        referer: 'https://www.v2ex.com/',
        'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('https://www.v2ex.com/?tab=hot', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const resHtml = cheerio.load(result.data)('.item_title a');
    for (let index = 0; index < resHtml.length; index++) {
      const element = resHtml[index];
      res.content.push({ href: `https://www.v2ex.com${element.attribs.href}`, title: element.firstChild.data });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async tiebaTopic() {
    const { ctx, exTime, prefix, redis } = this;
    const cacheKey = 'tieba:topic';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: '贴吧热议榜单',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const result = await ctx.curl('http://tieba.baidu.com/hottopic/browse/topicList');
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const data = JSON.parse(result.data);
    for (let index = 0; index < data.data.bang_topic.topic_list.length; index++) {
      const element = data.data.bang_topic.topic_list[index];
      res.content.push({ href: element.topic_url.replace('amp;', ''), title: element.topic_desc.replace('查看详情&gt;&gt;', ''), image: element.topic_pic });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async doubanExplore() {
    const { ctx, exTime, prefix, redis, userAgent, cheerio } = this;
    const cacheKey = 'douban:explore';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: '豆瓣精选',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        host: 'www.douban.com',
        referer: 'https://www.douban.com/group/explore',
        'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('https://www.douban.com/group/explore', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const resHtml = cheerio.load(result.data)('div .channel-item .bd h3 a');
    for (let index = 0; index < resHtml.length; index++) {
      const element = resHtml[index];
      res.content.push({ href: element.attribs.href, title: element.firstChild.data });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async tianyaHot() {
    const { ctx, exTime, prefix, redis, userAgent, cheerio } = this;
    const cacheKey = 'tianya:hot';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: '天涯热榜贴',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        host: 'bbs.tianya.cn',
        'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('http://bbs.tianya.cn/hotArticle.jsp', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const resHtml = cheerio.load(result.data)('.td-title a');
    for (let index = 0; index < resHtml.length; index++) {
      const element = resHtml[index];
      res.content.push({ href: `http://bbs.tianya.cn/${element.attribs.href}`, title: element.firstChild.data });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async githubTrending() {
    const { ctx, exTime, prefix, redis, userAgent, cheerio } = this;
    const cacheKey = 'github:trending';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: 'Github趋势',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        Host: 'github.com',
        Referer: 'https://github.com/explore',
        'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('https://github.com/trending', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const resHtml = cheerio.load(result.data)('.Box-row');
    for (let index = 0; index < resHtml.length; index++) {
      const a = cheerio.load(resHtml[index])('h1 a');
      const describe = cheerio.load(resHtml[index])('p').text();
      res.content.push({ href: `https://github.com${a[0].attribs.href}`, title: (a[0].lastChild.data || '').replace(/\n/g, '').trim(), describe: describe.replace(/\n/g, '').trim() });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
  async neteaseTop() {
    const { ctx, exTime, prefix, redis, userAgent, cheerio } = this;
    const cacheKey = 'netease:top';
    const cache = await redis.get(`${prefix}${cacheKey}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const res = {
      name: '云音乐飙升榜',
      content: [],
      cache: {
        time: new Date(),
        ex: exTime,
      },
    };
    const options = {
      headers: {
        authority: 'music.163.com',
        referer: 'https://music.163.com/',
        'user-agent': userAgent,
      },
    };
    const result = await ctx.curl('https://music.163.com/discover/toplist?id=19723756', options);
    if (result.status !== 200) {
      throw new Error('http error');
    }
    const resHtml = cheerio.load(result.data)('#song-list-pre-cache .f-hide li a');
    for (let index = 0; index < resHtml.length; index++) {
      const element = resHtml[index];
      res.content.push({ href: `https://music.163.com${element.attribs.href}`, title: element.firstChild.data });
    }
    redis.set(`${prefix}${cacheKey}`, JSON.stringify(res), 'EX', exTime);
    return res;
  }
}

module.exports = CrawlerService;
