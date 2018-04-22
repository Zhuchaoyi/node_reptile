/**
 * Author Zhu
 * Time 2018-04-21
 */
//获取对应cookies和盐的配置
exports.csConfig = {
    method: 'GET',
    hostname: 'segmentfault.com',
    path: '/frontend/newest',
    port: 443,
    headers: {
        authority: 'segmentfault.com',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'user-agent': 'User-Agent:Mozilla/5.0(compatible;MSIE9.0;WindowsNT6.1;Trident/5.0;'
    }
};

//获取列表的请求项配置
exports.listConfig = {
    method: 'GET',
    hostname: 'segmentfault.com',
    port: 443,
    headers: {
        cookie: '_ga=GA1.2.1561097934.1524056372; _gid=GA1.2.2121650717.1524056372; PHPSESSID=web1~fskjdpoo1lild2ujfmdd4qm3lg; Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1524056372,1524141055; afpCT=1; last-url=/frontend; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1524142177',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        accept: '*/*',
        referer: 'https://segmentfault.com/frontend/newest'
    }
};

//获取文章详情页的配置
exports.pageConfig = {
    method: 'GET',
    url: '',
    timeout: 8000,
    encoding: null,
    headers: {
        'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
    }
};