'use strict';

const Controller = require('egg').Controller;
// const fs = require('fs');
// const path = require('path');
// const https = require('https');

class ProxyController extends Controller {
  async index() {
    const { ctx } = this;
    // const body = await ctx.curl("", {
    //   strictSSL: false,
    //   rejectUnauthorized: false
    // });
    // ctx.body = body;
    ctx.body = '';
    // await this.ctx.render('home');
  }
}

module.exports = ProxyController;
