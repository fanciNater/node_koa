/*
 * @Author: your name
 * @Date: 2020-05-18 18:25:22
 * @LastEditTime: 2020-12-26 17:10:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/demo/nodeJs/node_koa/config/mysql_config.js
 */
const mysql = require("mysql");

class mysqlConfig {
    static getConn() {
        let conn = mysql.createConnection({
            user: "root",
            password: "123456",
            database: "demo",
            host: "47.114.52.172",
            port: "3306"
        });
        conn.connect();
        return conn;
    }
}

module.exports = mysqlConfig;