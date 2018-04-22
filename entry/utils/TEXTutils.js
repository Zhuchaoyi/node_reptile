/**
 * Author Zhu
 * Time 2018-04-22
 */

exports.getRead = function (html) {
    html = html.replace(/[\r\n\s]/g, '');
    let reg = /<strongclass="no-stress">(.*?)<\/strong>/g;
    reg = reg.exec(html);
    // return reg[1];
    return RegExp.$1;
}

exports.getCollection = function (html) {
    html = html.replace(/[\r\n\s]/g, '');
    let reg = /<spanclass="sideBookmarkNum">(.*?)<\/span>/g;
    reg = reg.exec(html);
    // return reg[1];
    return RegExp.$1;
}