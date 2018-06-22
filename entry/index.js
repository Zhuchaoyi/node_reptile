/**
 * Author Zhu
 * Time 2018-04-17
 */
const https = require('https');
const childprocess = require('child_process');
const os = require('os');

const getSolSession = require('../entry/getSolSession');
const {connection} = require('./Dao/connectDB');
const {getArticles} = require('./Dao/DBoperate');
const {getRead, getCollection} = require('./utils/TEXTutils');
let {listConfig} = require('../entry/config');

let Observer = {};

// getSolSession.get().then((value) => {
//     let nextStart = 0;
//     console.log('start', value)
//     Object.defineProperty(Observer, 'nextStart', {
//         set(newval) {
//             console.log('observer-start');
//             nextStart = newval;
//             console.log(newval, value.soil)
//             listConfig.path = '/api/channel/frontend/newest?start=' + newval + '&_=' + value.soil;
//             listConfig.headers.cookie = value.cookies.join().split(';')[0];
//             get(listConfig);
//         },
//         get() {
//             return nextStart;
//         }
//     });
//
//     Observer.nextStart = 0;
// });
//
// function get(config) {
//     let req = https.request(config, (res) => {
//         let content = '';
//         res.on('data', (chunk) => {
//             content += chunk.toString();
//         });
//         res.on("end", function () {
//             let json = JSON.parse(content);
//             rows = json.data.rows;
//             let insert = 'insert into articles values ';
//             let valueArr = [];
//             rows.forEach((item) => {
//                 let id = item.id;
//                 let title = item.title;
//                 let url = item.url;
//                 let votes = item.votes;
//                 let mtime = item.mtime;
//                 valueArr.push(`("${id}","${title}","${url}",${votes},0,${mtime})`);
//             });
//             insert += valueArr.join(',');
//             connection.query(insert, (err, result) => {
//                 // console.log(err, result);
//                 console.log('record-over');
//                 setTimeout(function () {
//                     Observer.nextStart = json.data.nextStart;
//                     // Observer.nextStart += json.data.rows.length;
//                 }, 1000);
//             });
//         });
//     });
//     req.on('error', (e) => {
//         console.error(e);
//     });
//     req.end();
// }


let resArr = [];
let update_Observer = {};
Object.defineProperty(update_Observer, 'resArr', {
    get() {
        return resArr;
    },
    set(newVal) {
        resArr.push(newVal);
        console.log(resArr.length, newVal);
        // if (resArr.length > 10) {
        //     console.log(resArr);
        // }
    }
});

let lock = false;
let cpus = os.cpus().length;
getArticles(10).then((artiList) => {
    let pos = cpus - 1;
    let startThread = function (tpos) {
        /*开启线程*/
        let child = childprocess.fork('entry/pageHandler.js');
        child.send({order: tpos, url: artiList[tpos]['url']});

        child.on('message', (res) => {
            let id = artiList[res.order]['id'];
            let read = getRead(res.body);
            let collection = getCollection(res.body);
            update_Observer.resArr = {
                id: id,
                read: read,
                collection: collection
            };
            child.kill(os.constants.signals.SIGKILL);
            child = childprocess.fork('entry/pageHandler.js');

            if (lock) {
                let timer = setInterval(function () {
                    if (!lock) {
                        clearInterval(timer);
                        child.send({order: pos, url: artiList[pos]['url']});
                    }
                }, 1000);
            } else {
                lock = true;
                pos++;
                child.send({order: pos, url: artiList[pos]['url']});
                lock = false;
            }
        });
    };
    while (cpus > 0) {
        startThread(cpus);
        cpus--;
    }
});
