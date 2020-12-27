/*
 * @Author: your name
 * @Date: 2020-12-26 17:28:46
 * @LastEditTime: 2020-12-27 11:13:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/demo/nodeJs/node_koa/utils/date.js
 */
module.exports = function(actuDate) {
    let year = actuDate.getFullYear()
    let month = actuDate.getMonth() + 1
    let date = actuDate.getDate()
    let hour = actuDate.getHours()
    let minute = actuDate.getMinutes()
    let second = actuDate.getSeconds()
    if (month < 10) {
        month = '0' + month
    }
    if (date < 10) {
        date = '0' + date
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    if (second < 10) {
        second = '0' + second
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}