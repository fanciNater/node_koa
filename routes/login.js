const router = require("koa-router")();
const LoginServie = require("../services/login.service");
const RespJson = require("../model/RespJson");

router.post("/login", async (req, res) => {
    let loginService = new LoginServie();
    let params = req.request.body;
    let result = await loginService.checkUser(params);
    try {
        if (result.length === 1) {
            // res.json(new RespJson("ok", "登录成功"));
            req.body = new RespJson("ok", "登录成功");
        } else {
            // res.json(new RespJson("error", "账号或密码错误，请重试"));
        }
    } catch (error) {
        res.json(new RespJson("error", "服务器错误"));
    }
});

module.exports = router;