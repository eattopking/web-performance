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
