/**
 * Author Zhu
 * Time 2018-04-21
 */
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zhuchaoyi',
    database: 'sys'
});
let con = null;

exports.connection = function () {
    if (!con) {
        con = connection.connect();
    }
    return con;
};