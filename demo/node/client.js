// const dgram = require('dgram');
// const client = dgram.createSocket('udp4');
// const buffer = new Buffer('upd客户端发消息');
// // udp套接字作为客户端发送消息的方法
// // 参数 1. 要发送的buffer 2. buffer的偏移量 3. Buffer的长度 4. 目标端口 5. 目标地址
// client.send(buffer, 0, buffer.length, 41234, "localhost", () => {
//     console.log('发送成功')
// });

// client.on('message', (data, info) => {
//     console.log('datadatadatadatadata', data, info);
// })

const http = require('http');

// 创建http客户端
const req = http.request({
    port: 7777,
    path:'/test/333/?foo=bar&foo=bar',
    hostname: '127.0.0.1',
    headers: {aaaa: 11111, bbbb: 2222},
    method: 'GET'
});

// 服务端响应事件
req.on('response', (res) => {
    //设置是指解析响应的内容的编码
    res.setEncoding('utf-8');
    // 获取响应数据的事件
    res.on('data', (data) => {
        console.log('data', data);
    });
});

// 客户端向服务器端发起Upgrade请求时，如果服务器端响应了101 Switching Protocols状态，客户端将会触发该事件
req.on('upgrade', () => {
   console.log('Switching Protocols状态');
});

// 服务端对提交大数据的预请求做出响应后，触发这个事件
req.on('continue', () => {
   console.log('服务端对提交大数据的预请求做出响应');
});

// 客户端使用连接进行请求事件
req.on('socket', () => {
   console.log('客户端使用连接进行请求事件')
});

// 发送请求， 请求体就是通过req.end()发送
req.end();

// const agent = new http.Agent({
//     maxSockets: 10
// })