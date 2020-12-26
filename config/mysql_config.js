/*
 * @Author: your name
 * @Date: 2020-05-18 18:25:22
 * @LastEditTime: 2020-12-26 15:35:52
 * @LastEditors: your name
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
            host: "127.0.0.1",
            port: "3306"
        });
        conn.connect();
        return conn;
    }
}

module.exports = mysqlConfig;