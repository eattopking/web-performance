## 前端文件的二进制处理

### Blob 二进制对象

对Blob的理解：
    blob对象是包含二进制数据的对象， Blob构造函数， 可以实例化blob实例

Blob实例化的方式：

```
1. 第一个参数为数据原始数据内容， 需要放在数组中， 数组中可以放多项，多项会被统一存储
2. 第二个参数时文件类型

例如：
const blob = new Blob(['111111'], { type: 'image/png'  }])

实例的主要属性有：
size: 3
type: "text/html"

还有实例构在原型上继承的属性这里没有展示
```

### File 二进制对象

对File的理解：
    file对象是包含二进制数据的对象， File构造函数， 可以实例化file实例,
    File构造函数继承自Blob构造函数， 并在Blob的基础上进行的扩展

File实例化的方式：

```
1. 第一个参数为数据原始数据内容， 需要放在数组中， 数组中可以放多项，多项会被统一存储
2. 第二个为文件名称
3. 第三个参数为文件类型

例如：
const file = new File(['111111'], 'filename', { type: 'image/png'  }])

实例的主要属性有：
lastModified: 1603034947379
lastModifiedDate: Sun Oct 18 2020 23:29:07 GMT+0800 (中国标准时间) {}
name: "11"
size: 3
type: "text/html"
webkitRelativePath: ""

还有实例构在原型上继承的属性这里没有展示
```

### window.URL.createObjectURL

这个方法的作用， 就是将Blob实例或者File实例， 转化为ObjectUrl，
ObjectUrl可以被image.src加载展示 或者a.download 加载下载(a表示任意元素)，(备注：download属性不
兼容IE, 对IE可通过window.navigator.msSaveBlob方法或其他进行优化)
```
const file = new File(['111111'], 'filename', { type: 'image/png'  }])
window.URL.createObjectURL(file)

// 释放一个之前通过调用 URL.createObjectURL创建的 URL 对象
window.URL.revokeObjectURL(url);
使用完objectUrl之后需要将objectUrl释放
```

### FileReader 构造函数， 创建的实例用于读取File或者Blob的实例数据

FileReader实例提供三个方法

1. readAsDataURL 将Blob或者File实例的数据转化为base64格式 dataUrl形式
2. readAsArrayBuffer 将Blob或者File实例的数据读取成ArrayBuffer的形式
3. readAsText 将Blob或者File实例的数据读取成读取成文本字符串的形式

```
使用方式

const reader = new FileReader();
reader.addEventListener('load', () => {

    // result是 读取到的dataurl形式的数据
    const {
        result
    } = reader;
    const params = {
        uploadType: 1,
        fileType: 1
    };
    // 前端直穿url
    endUpload(result, params).then((res) => {
        handleChange(res, value, onChange);
    });

}, false);
reader.readAsDataURL(file);
```






