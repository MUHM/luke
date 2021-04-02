'use strict';
const Service = require('egg').Service;

class WeatherService extends Service {
  constructor(ctx) {
    super(ctx);
    this.prefix = 'weather:';
    this.redis = ctx.app.redis.get('core');
    this.exTime = 1200;
  }
  /**
  * 查询城市天气
  * @param {Integer} [city] - 城市编码，默认杭州
  * @return {Promise} 天气信息
  */
  async getByCity(city = 58457) {
    const { redis, prefix, exTime, ctx } = this;
    const cache = await redis.get(`${prefix}${city}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const result = await ctx.curl(`http://www.nmc.cn/rest/weather?stationid=${city}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
      },
      dataType: 'json',
      timeout: 3000,
    });
    if (result.status !== 200) {
      throw new Error('http error');
    }
    redis.set(`${prefix}${city}`, JSON.stringify(result.data.data.real.weather), 'EX', exTime);
    return result.data.data.real.weather;
  }
}

module.exports = WeatherService;
