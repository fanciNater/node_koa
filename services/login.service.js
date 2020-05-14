const mysqlConfig = require("../config/mysql_config");
class LoginService {
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