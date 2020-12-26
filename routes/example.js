/*
 * @Author: your name
 * @Date: 2020-12-26 14:17:47
 * @LastEditTime: 2020-12-26 14:22:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/demo/nodeJs/node_koa/routes/example.js
 */
const router = require("koa-router")();

router.post("/example", (ctx, next) => {
    ctx.body = "hello，我想你啦！！！"
});

module.exports = router;