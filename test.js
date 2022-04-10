

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

const { execFile } = require('child_process');
const child = execFile('node',['--version'], {shell: true}, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

child.stdout.on('data', (data) => {
  console.log(555555, data);
})