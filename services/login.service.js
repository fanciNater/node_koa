const mysqlConfig = require("../config/mysql_config");
class LoginService {
    /**
     * @author fanciNate
     * @date 2020年5月15日
     * @description 登录数据库操作逻辑
     * @param {*} params 请求参数
     */
    checkUser(params) {
        return new Promise((resolve, reject) => {
            let conn = mysqlConfig.getConn();
            let sqlStr = `select * from user_info where user_name=? and user_pwd=?`;
            console.log("获取参数");
            console.log(params);
            conn.query(sqlStr, [params.user_name, params.user_pwd], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
                conn.end();
            })
        });
    }
}

module.exports = LoginService;