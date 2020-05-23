const mysqlConfig = require("../config/mysql_config");
class UploadService {
    /**
     * 
     * @param {*} mId
     * @param {*} photo 
     * @name 保存图片地址
     */
    upload(file) {
        return new Promise((resolve, reject) => {
            var conn = mysqlConfig.getConn();
            let strSql = `insert into file_info (file) values (?)`;
            conn.query(strSql, [file], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
                conn.end();
            });
        });
    }

    searchFile(filePath) {
        return new Promise((resolve, reject) => {
            let conn = mysqlConfig.getConn();
            let strSql = `select * from file_info where file like ${filePath}`;
            conn.query(strSql, [filePath], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
                conn.end();
            })
        })
    }
}

module.exports = UploadService;