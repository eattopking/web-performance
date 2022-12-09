const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const buffer = new Buffer('upd客户端发消息');
// udp套接字作为客户端发送消息的方法
// 参数 1. 要发送的buffer 2. buffer的偏移量 3. Buffer的长度 4. 目标端口 5. 目标地址
client.send(buffer, 0, buffer.length, 41234, "localhost", () => {
    console.log('发送成功')
});

client.on('message', (data, info) => {
    console.log('datadatadatadatadata', data, info);
})