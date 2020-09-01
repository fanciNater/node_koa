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