'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.service.weather.getByCity();
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = WeatherController;
