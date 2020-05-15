const router = require("koa-router")();
const LoginServie = require("../services/login.service");
const RespJson = require("../model/RespJson");

router.post("/login", async (ctx, next) => {
    let loginService = new LoginServie();
    let params = ctx.request.body;
    try {
        let result = await loginService.checkUser(params);
        if (result.length === 1) {
            ctx.body = new RespJson("ok", "登录成功");
        } else {
            ctx.body = new RespJson("error", "账号或密码错误，请重试");
        }
    } catch (error) {
        ctx.body = new RespJson("error", "服务器错误");
    }
});

module.exports = router;