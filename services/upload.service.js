/*
 * @Author: your name
 * @Date: 2020-05-22 17:39:04
 * @LastEditTime: 2020-12-27 11:31:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/demo/nodeJs/node_koa/services/upload.service.js
 */
const mysqlConfig = require("../config/mysql_config");
const dataUitl = require("../utils/date")
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
            let lastUploadDate = dataUitl(new Date())
            let strSql = `insert into file_list_info (file_name, lastUploadDate) values (?,?)`;
            conn.query(strSql, [file, lastUploadDate], (err, result) => {
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

    queryUploadFile(id) {
        return new Promise((resolve, reject) => {
            let conn = mysqlConfig.getConn();
            let sqlStr = `select * from file_list_info where id=${id}`
            conn.query(sqlStr,[id] , (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
                conn.end()
            })
        })
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