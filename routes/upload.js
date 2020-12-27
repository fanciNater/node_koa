/*
 * @Author: your name
 * @Date: 2020-05-22 17:38:48
 * @LastEditTime: 2020-12-27 15:43:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/demo/nodeJs/node_koa/routes/upload.js
 */
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
    const host = ctx.request.header.host;
    let uploadService = new UploadService();
    let file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // let filePath = path.join(__dirname, '../public/files') + `/${file.name}`;
    let filePath = `${host}/wucan/koa/node-koa/public/files/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    try {
        let result = await uploadService.upload(filePath);
        if (result.affectedRows) {
            let queryFile = await uploadService.queryUploadFile(result.insertId)
            console.log('result', queryFile)
            ctx.body = new RespJson("ok", "上传成功", {
                attachmentUrl: queryFile[0].file_name
            });
        } else {
            ctx.body = new RespJson("error", "上传失败");
        }
    } catch (error) {
        ctx.body = new RespJson("error", "服务器错误");
    }
});

module.exports = router;