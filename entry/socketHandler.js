/**
 * Created by Zhucy on 2018/6/21
 * description:
 */
const net = require('net');

let socket = new net.Socket();

exports.testConnect = function (host, port) {
    return new Promise((resolve, reject) => {
        socket.connect(port, host, () => {
            console.log('通了', host, port);
            resolve(host + ':' + port);
            socket.destroy();
        });

        socket.setTimeout(5000);
        socket.on('timeout', () => {
            socket.destroy();
        });

        socket.on('close', () => {
            console.log('关了');
        });

        socket.on('error', (e) => {
            console.log('错了');
            reject(e);
        });
    });
};