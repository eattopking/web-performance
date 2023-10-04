```
import SockJS from "sockjs-client";
import Stomp from "stompjs";

/**
 * 1. 前端进行ws通信， 确保前端使用的通信方案能和后端连通， 这个方案基本上是肯定可以连通的
 * 2. 心跳检测就是一直给ws隔一段时间发消息就行
 */

// 连接函数
let number = 1;
let stompClient = null;
let timeId = null;
export function reconnect(url, messageCallback) {
    // 这里的url， 要使用完整的http或者https地址， 然后SockJS和Stomp会把它转成ws，url直接用ws的地址不行
    // 建立连接对象（还未发起连接）
    let socket = new SockJS(url);
    // 获取 STOMP 子协议的客户端对象
    stompClient = Stomp.over(socket);
   
    // 向服务器发起websocket连接并发送CONNECT帧
    stompClient.connect(
        {}, //可添加客户端的认证信息
        function connectCallback() {
            clearInterval(timeId);
            // 心跳检测
            timeId = this.timeoutObj = setInterval(function () {
                stompClient.send("ping");
            }, 10000);
            //订阅频道
            stompClient.subscribe("监听地址", function (data) {
                if (data) {
                    messageCallback(data);
                }
            });
        },
        function errorCallBack() {
            //连接失败时再次调用函数
            number += 1;
            if (number <= 10) {
                reconnect(url);
                return;
            }
            number = 1;
            // 断开链接
            disconnect();
        }
    );
}

export function disconnect() {
    stompClient.disconnect(function () {
        console.log("断开websocket连接");
        clearInterval(timeId);
    });
}
```


ws通过tcp建立连接（和http一样有三次握手四次挥手的过程），然后ws内部使用http协议的get请求向ws服务器请求升级协议为websocket，
请求头是：Connecttion: Upgrade 表示升级协议、Upgrade： websocket表示升级的协议为websocket
响应状态码为101，并且响应头是Connecttion: Upgrade、Upgrade： websocket 表示升级协议为websocket成功，之后就用websocket协议通信了

ws传输的数据可以是文本，也可以是二进制，可以设置，如果是二进制用的时候需要转化，通过ws请求的时候需要将文本转为二进制

ws 默认端口是80，wss 加密的端口是443（wss的加密也是使用TLS）
ws 是应用层协议、双向数据传输（全双工通信）、通过tcp建立持久连接


#### 原生ws使用

// 构造 webSocket 连接对象， 通过这个实例事件监听到连接成功了就可以发消息了，也可以接收消息了
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(ws) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

socket.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
};

socket.onclose = function(evt) {
  console.log("Connection closed.");
}; 

每个属性的具体含义如下：

binaryType：使用二进制的数据类型连接；
bufferedAmount（只读）：未发送至服务器的字节数；
extensions（只读）：服务器选择的扩展；
onclose：用于指定连接关闭后的回调函数；
onerror：用于指定连接失败后的回调函数；
onmessage：用于指定当从服务器接受到信息时的回调函数；
onopen：用于指定连接成功后的回调函数；
protocol（只读）：用于返回服务器端选中的子协议的名字；
readyState（只读）：返回当前 WebSocket 的连接状态，共有 4 种状态：


readyState（只读）：返回当前 WebSocket 的连接状态，共有 4 种状态：
CONNECTING — 正在连接中，对应的值为 0；
OPEN — 已经连接并且可以通讯，对应的值为 1；
CLOSING — 连接正在关闭，对应的值为 2；
CLOSED — 连接已关闭或者没有连接成功，对应的值为 3；



url（只读）：返回值为当构造函数创建 WebSocket 实例对象时 URL 的绝对路径；

事件对象主要方法：

close()：关闭 WebSocket 连接，如果连接已经关闭，则此方法不执行任何操作；

send(data)：通过 WebSocket 连接传输至服务器的数据队列，并根据所需要传输的数据的大小来增加 bufferedAmount 的值；


主要事件：

close：当一个 WebSocket 连接被关闭时触发，也可以通过 onclose 属性来设置；
error：当一个 WebSocket 连接因错误而关闭时触发，也可以通过 onerror 属性来设置；
message：当通过 WebSocket 收到数据时触发，也可以通过 onmessage 属性来设置；
open：当一个 WebSocket 连接成功时触发，也可以通过 onopen 属性来设置；


ws客户端和服务端通信过程格式大概是这样的

Client: FIN=1, opcode=0x1, msg="hello" // 客户端
Server: (process complete message immediately) Hi. // 服务端返回

Opcode 表示操作码，它的可能值有：

0x1，传输数据是文本；
0x2，传输数据是二进制数据；
0x0，表示该帧是一个延续帧（这意味着服务器应该将帧的数据连接到从该客户端接收到的最后一个帧）；
0x3-7：保留的操作代码，用于后续定义的非控制帧；
0x8：表示连接断开；
0x9：表示这是一个心跳请求（ping）；
0xA：表示这是一个心跳响应（pong）；
0xB-F：保留的操作代码，用于后续定义的控制帧；

FIN：1 个比特，值为 1 表示这是消息的最后一帧，为 0 则不是；
RSV1, RSV2, RSV3：各占 1 个比特，一般情况下全为 0，非零值表示采用 WebSocket 扩展；
Mask: 1 个比特，表示是否要对数据进行掩码操作；
Payload length：数据负载的长度，单位是字节。为 7 位，或 7+16 位，或 1+64 位；
Masking-key：0 或 4 字节（32 位），所有从客户端传送到服务端的数据帧，数据都进行了掩码操作，Mask 为 1，且携带了 4 字节的 Masking-key；如果 Mask 为 0，则没有 Masking-key；
Payload data：具体数据；

### ws原生如何检测心跳

