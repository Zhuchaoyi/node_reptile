/**
 * Created by Zhucy on 2018/6/21
 * description:
 */
const net = require('net');

let socket = new net.Socket();

function testConnect(host, port, succ, fail) {
    socket.connect(port, host, () => {
        console.log(process.geteuid(), '通了', host, port);
        socket.destroy();
        succ();
    });

    socket.setTimeout(5000);
    socket.on('timeout', () => {
        socket.destroy();
    });

    socket.on('close', () => {
        console.log(process.geteuid(), '关了', host, port);
    });

    socket.on('error', (e) => {
        console.log(process.geteuid(), '错了', host, port);
        fail();
    });
}

process.on('message', (data) => {
    testConnect(data.ip, data.port);
});