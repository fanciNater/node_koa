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