/**
 * Author Zhu
 * Time 2018-04-22
 */
const {connection} = require('./connectDB');

exports.getArticles = function (limit) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from sys.articles where status <>1 limit ${limit}`, (err, res) => {
            err ? reject(err) : resolve(res);
        })
    });
};

exports.updateArticlesStatus = function (resArr) {

}