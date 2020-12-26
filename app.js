/*
 * @Author: your name
 * @Date: 2020-05-14 17:52:31
 * @LastEditTime: 2020-12-26 14:20:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/demo/nodeJs/node_koa/app.js
 */
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const token = require('./utils/jwtUtil')
const RespJson = require('./config/RespJson');
const fs = require('fs');
const path = require('path');

const login = require("./routes/login");
const upload = require("./routes/upload");
const example = require("./routes/example")

const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

// error handler
onerror(app)

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public/files'))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// 调用编写的登录插件
app.use(login.routes());
app.use(upload.routes());
app.use(example.routes());

// JWT拦截器
// app.use(async (ctx, next) => {
//   let authToken = null;
//   if (ctx.request.header && ctx.request.header.authtoken) {
//     authToken = ctx.request.header.authtoken;
//   }
//   if (token.checkToken(authToken)) {
//     ctx.status = 401;
//     ctx.body = "tolen已失效，请重新登录";
//   } else {
//     await next();
//   }
// })

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app