/**
 * Author Zhu
 * Time 2018-04-22
 */
const request = require("request");
const {fromWeb} = require('./utils/IPutils');
let {pageConfig} = require('../entry/config');

function handle(order, page) {
    pageConfig.url = 'https://segmentfault.com' + page;
    fromWeb().then((proxyList) => {
        proxyList.forEach((item, index) => {
            // console.log(`------${pageConfig.url}--------${item}`);
            pageConfig.proxy = 'http://' + item;
            request(pageConfig, function (err, res, body) {
                // console.log(index)
                try {
                    if (err) {
                        // console.log(index, ' error');
                        throw err;
                    } else {
                        console.log(`------${pageConfig.url}--------${item}`);
                        body = body.toString();

                        process.send({
                            order: order,
                            body: body
                        })
                        ;
                    }
                } catch (e) {
                    // console.log(index, 'inner error');
                }
            }).on('error', function (err) {
                // console.log(index, 'outer error')
            });
        });
    });
}

process.on('uncaughtException', (err) => {
    // console.log('socket error');
});

process.on('message', (data) => {
    handle(data.order, data.url);
});