

// var child = require('child_process');
const  aaa = require('fs-extra');
const  os = require('os');
const  fs = require('fs');
const  bbb = require('/Users/zhangheng/lx/web-performance/ccc');

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


const a = new Buffer('哈哈哈哈')
console.log('a', a.toJSON())

console.log(bbb)

console.log(2222, os.tmpdir());

const writeStream = fs.createWriteStream('/Users/zhangheng/lx/web-performance/ccc/index.js');
const readStream = fs.createReadStream('/Users/zhangheng/lx/web-performance/ccc/sss.js');

readStream.pipe(writeStream);