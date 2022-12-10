

// var child = require('child_process');
// const  aaa = require('fs-extra');
// const  os = require('os');
// const  fs = require('fs');
// const  bbb = require('/Users/zhangheng/lx/web-performance/ccc');

// const scholarProcess = child.fork('/Users/zhangheng/lx/web-performance/test1.js', {
  
//   detached: false,
//   silent: true,
// });
// let message = '';
// scholarProcess.stdin.on('data', (data) => {
//   console.log('data1111', data.toString())
//   message += data.toString() + '\n';
// });
// scholarProcess.stderr.on('data', (data) => {
//   console.log('data222', data.toString())
//   message = '!!!' + data.toString() + '\n';
// });
// scholarProcess.on('error', (data) => {
//   console.log('data333', data)
//   message = '!!!' + data.toString() + '\n';
// });
// scholarProcess.on('exit', () => {
//   console.log('scholarProcess =====');
//   console.log('4444', message);
//   console.log('scholarProcess =====');
// });

// console.log('进程id2',process.pid)

// const { execFile } = require('child_process');
// const child = execFile('node',['--version'], {shell: true}, (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });

// child.stdout.on('data', (data) => {
//   console.log(555555, data);
// })

// const http = require('http');
// const numCPUs = require('os').cpus().length;
// console.log(11111, numCPUs)
// const cluster = require('cluster');
// if(cluster.isMaster){
//     console.log('Master proces id is',process.pid);
//     // fork workers
//     for(let i= 0;i<numCPUs;i++){
//       console.log(555555)
//         cluster.fork();
//     }
//     cluster.on('exit',function(worker,code,signal){
//         console.log('worker process died,id',worker.process.pid)
//     })
// }else{
//   console.log(22222)
//     // Worker可以共享同一个TCP连接
//     // 这里是一个http服务器
//     http.createServer(function(req,res){
//         res.writeHead(200);
//         res.end('hello word');
//     }).listen(8000);

// }

// async function saveResourceFile(){
//   await aaa.writeFile('/Users/zhangheng/lx/web-performance/test1.js', '222222');
// }

// saveResourceFile()


// const a = new Buffer('哈哈哈哈')
// console.log('a', a.toJSON())

// console.log(bbb)

// console.log(2222, os.tmpdir());

// const writeStream = fs.createWriteStream('/Users/zhangheng/lx/web-performance/ccc/index.js');
// const readStream = fs.createReadStream('/Users/zhangheng/lx/web-performance/ccc/sss.js');

// readStream.pipe(writeStream);


// var child = require('child_process');

// const scholarProcess = child.fork('/Users/zhangheng/lx/web-performance/test1.js', {
  
//   detached: false,
//   silent: true,
// });
// let message = '';
// scholarProcess.stdin.on('data', (data) => {
//   console.log('data1111', data.toString())
//   message += data.toString() + '\n';
// });
// scholarProcess.stderr.on('data', (data) => {
//   console.log('data222', data.toString())
//   message = '!!!' + data.toString() + '\n';
// });
// scholarProcess.on('error', (data) => {
//   console.log('data333', data)
//   message = '!!!' + data.toString() + '\n';
// });
// scholarProcess.on('exit', () => {
//   console.log('scholarProcess =====');
//   console.log('4444', message);
//   console.log('scholarProcess =====');
// });

// console.log('进程id2',process.pid)

// const { execFile } = require('child_process');
// const child = execFile('node',['--version'], {shell: true}, (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });

// child.stdout.on('data', (data) => {
//   console.log(555555, data);
// })


// const dgram = require('dgram');

// // 创建UDP套接字
// const server = dgram.createSocket('udp4');

// server.on("message", function (msg, rinfo) {
//   // rinfo 具体字段
//   // {"address":"127.0.0.1","family":"IPv4","port":52286,"size":21}
//   const buffer = new Buffer('upd服务端端发消息');
//   server.send(buffer, 0, buffer.length, rinfo.port, "localhost");
// });

// server.on('listening', function() {
//  var address = server.address();
//  console.log('address', address)
// });

// // 创建服务端监听
// server.bind(41234);
const http = require('http');

const server = http.createServer((req, res) => {
  // setHeader可以多次调用设置多个header，但是只有在调用writeHead的时候才会一起发出去
  // 并且setHeader和writeHead只能在res.wrire和res.end之前执行，执行到res.wrire和res.end的时候setHeader和writeHead就不能在执行了
  res.setHeader('aaa', '111');
  res.setHeader('bbbb', '111');
  // 直接在全在这个对象里设置header不通过setHeader设置也是一样的
  res.writeHead(200, {ccc: '1111'});
  
  // res.end执行包括 res.write响应数据， 并且告诉服务器响应结束，然后服务器就会做响应结束的连接处理，也会告诉客户端响应结束
  res.end('222222');
});
server.listen(7777);

server.on('connection', () => {
  console.log('建立TCP连接后触发这个事件');
});

server.on('request', () => {
  console.log('解析请求头后触发这个事件');
});

server.on('close', () => {
  console.log('server.close()方法调用后触发这个事件， tcp连接断开触发这个事件');
});

// 传大数据浏览器发送Expect: 100-continue进行预请求的时候服务端触发这个事件，不过不同意直接返回404
// 这个事件和request事件互斥，checkContinue验证通过之后，再次请求才会触发request事件
// 如果不处理checkContinue事件那么就默认允许支持传大数据
server.on('checkContinue', () => {
  console.log('传递大数据浏览器发送Expect: 100-continue进行预请求的时候服务端触发这个事件，不过不同意直接返回404');
});

// 客户端发生error事件服务端会触发clientError
server.on('clientError', () => {
  console.log('客户端发生error事件服务端会触发clientError');
});

