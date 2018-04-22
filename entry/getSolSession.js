/**
 * Author Zhu
 * Time 2018-04-19
 */
const https = require('https');
const {csConfig} = require('../entry/config')

const reg = /(w\.SF\.token.*\n(?:.*\n)+(?=\}\)\(\)\;\;).*)/g;


exports.get = function () {
    return new Promise((resolve, reject) => {
        let cookies, soil;
        let req = https.request(csConfig, (res) => {
            let html = '';
            res.on('data', (chunk) => {
                html += chunk.toString();
            });
            res.on("end", function () {
                reg.exec(html);
                let js = RegExp.$1;
                let w = {SF: {}};
                eval(js);
                soil = w.SF.token;
                cookies = res.headers['set-cookie'];
                resolve({
                    soil: soil,
                    cookies: cookies
                });
            });
        });
        req.on('error', (e) => {
            console.error(e);
        });
        req.end();
    });
}

const config = {
    host: '112.95.94.123',
    port: 9797,
    method: 'GET',
    path: 'http://segmentfault.com/frontend/newest',
    headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'user-agent': 'User-Agent:Mozilla/5.0(compatible;MSIE9.0;WindowsNT6.1;Trident/5.0;'
    }
};

let cookies, soil;
let req = https.request(config, (res) => {
    let html = '';
    res.on('data', (chunk) => {
        html += chunk.toString();
    });
    res.on("end", function () {
        reg.exec(html);
        let js = RegExp.$1;
        let w = {SF: {}};
        eval(js);
        soil = w.SF.token;
        cookies = res.headers['set-cookie'];
        resolve({
            soil: soil,
            cookies: cookies
        });
    });
});
req.on('error', (e) => {
    console.error(e);
});
req.end();

