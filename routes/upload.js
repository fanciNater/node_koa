const router = require("koa-router")();
const RespJson = require("../config/RespJson");
const UploadService = require("../services/upload.service");
const fs = require("fs");
const path = require("path");

/**
 * @author fanciNate
 * @date 2020年5月15日
 * @description 登录路由
 */
router.post("/uploadAttachment", async (ctx, next) => {
    let uploadService = new UploadService();
    console.log("文件");
    let file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../public/files') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // let fileFlag = await uploadService.searchFile(filePath);
    // console.log(fileFlag);
    let result = await uploadService.upload(filePath);
    try {
        if (result.affectedRows) {
            ctx.body = new RespJson("ok", "上传成功");
        } else {
            ctx.body = new RespJson("error", "上传失败");
        }
    } catch (error) {
        ctx.body = new RespJson("error", "服务器错误");
    }
});

module.exports = router;