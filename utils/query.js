const mysql = require("mysql");
const mysqlCongif = require("../config/mysql_config");

// 创建连接池
const connectPool = mysql.connectPool(mysqlCongif);

// query sql语句入口
const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        connectPool.getConnection(function (err, con) {
            if (err) {
                reject(err);
            } else {
                con.query(sql, val, (err, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(fields);
                        con.release();
                    }
                });
            }
        })
    });
}

module.exports = {
    query
}