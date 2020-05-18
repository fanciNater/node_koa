const crypto = require('crypto');

// module.exports = {
//     MD5_SUFFIX: 'luffyZhouNodeCrawler我是一个固定长度的盐值',
//     md5: (pwd) => {
//         let md5 = crypto.createHash('md5');
//         return md5.update(pwd).digest('hex');
//     },
//     secretKey: 'wucan_nodejs_1993711_26_jwttoken'
    
// };
let user = '';
let token = {
    createToken: function (obj, timeout) {
        console.log(parseInt(timeout) || 0);
        let obj2 = {
            data: obj,//payload
            created: parseInt(Date.now()),//token生成的时间的，单位毫秒
            exp: parseInt(timeout) || 10000//token有效期
        };

        //payload信息
        let base64Str = Buffer.from(JSON.stringify(obj2), "utf8").toString("base64");

        //添加签名，防篡改
        let secret = "hel.h-five.com";
        let hash = crypto.createHmac('sha256', secret);
        hash.update(base64Str);
        let signature = hash.digest('base64');

        user = base64Str + "." + signature
        return base64Str + "." + signature;
    },
    decodeToken: function (token) {

        let decArr = token.split(".");
        if (decArr.length < 2) {
            //token不合法
            return false;
        }

        let payload = {};
        //将payload json字符串 解析为对象
        try {
            payload = JSON.parse(Buffer.from(decArr[0], "base64").toString("utf8"));
        } catch (e) {
            return false;
        }
        //检验签名
        let secret = "hel.h-five.com";
        let hash = crypto.createHmac('sha256', secret);
        hash.update(decArr[0]);
        let checkSignature = hash.digest('base64');

        return {
            payload: payload,
            signature: decArr[1],
            checkSignature: checkSignature
        }
    },
    checkToken: function (token) {
        let resDecode = this.decodeToken(token);
        console.log(resDecode);
        if (!resDecode) {
            return false;
        }
        //是否过期
        let expState = (parseInt(resDecode.payload.created)) + parseInt(resDecode.payload.exp) - parseInt(Date.now()) < 0 ? true : false;
        if (resDecode.signature === resDecode.checkSignature && expState) {
            return true;
        }
        return false;
    },
    getToken: () => {
        return user;
    }

}
module.exports = exports = token;