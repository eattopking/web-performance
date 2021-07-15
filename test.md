1. jest 执行的时候会默认查找项目根目录下的test.js结尾的文件执行

2. jest --init 初始化jest配置文件

3. jest --coverage 执行测试用例并且生成代码测试覆盖率报告

4. jest 如何执行执行es6 模块化或者其他es6语法的测试测试用例文件

我们在本地安装babel/core  babel/present-env 然后配置.babelrc, 这这样在我们通过jest 命令执行 测试用例文件的时候， jest利用babel-jest这个插件和webpack执行时一样去查本地是否安装了babel/core等，如果安装了就去取.babelrc的配置，然后利用babel-jest这个插件结合babel将代码转化成node环境可以识别的代码， 然后在执行转化后的代码


这个配置表示根据当前node环境， 将代码转换成node环境支持的代码

{
    "presets": [["@babel/preset-env", {
        "targets": {
            "node": "current"
        }
    }]]
}

.babelrc 是为了jest配置的babel 配置


5. jest --watchAll 和 a模式一样，监听所有测试文件变化， 自动重新执行所有测试文件的所有测试用例

6. jest 的测试模式

点击w进入选择模式

Watch Usage
 点击f是将所有测试文件中错误的用例在跑一遍， 在点击一下f退出f模式
 › Press f to run only failed tests.
 点击o和设置--watch一样， 就是只执行在git监测发生变化的测试文件里的所有测试用例
 › Press o to only run tests related to changed files.
 在--watchall 模式下筛选， 执行哪个测试文件的所有测试用例， 可以输入字符串或者正则表达式
 › Press p to filter by a filename regex pattern.
 是选要执行的测试用例的名称，可以输入字符串或者正则表达式
 › Press t to filter by a test name regex pattern.
 q退出用例执行
 › Press q to quit watch mode.
 回车就是在跑一遍用例， 根据当前的模式规则
 › Press Enter to trigger a test run.


 7. jest常用匹配器

 // 比较内容相等的匹配器
test('10与10是否相等', () => {
    // 期待 10  toBe是匹配器，和10匹配
    expect({}).toEqual({});
})

// 和object.is原理相同的匹配器
test('10与10是否相等', () => {
    // 期待 10  toBe是匹配器，和10匹配
    expect(10).toBe(10);
});


// 比较和固定值相等匹配器

test('是不是等于undefined', () => {
    expect(undefined).toBeUndefined();
});

test('是不是等于null', () => {
    expect(null).toBeNull();
})

// 取反匹配器
test('取反匹配器', () => {
    expect(20).not.toBe(10)
});


// 数字相关匹配器

test('0.1加0.2等于0.3', () => {
    // toBeCloseTo是专门测试js 小数相加的
    expect(0.1+0.2).toBeCloseTo(0.3)
})

test('0.1小于0.2', () => {
    // toBeLessThan 期待0.1小于0.2
    expect(0.1).toBeLessThan(0.2)
});

test('小于或者等于0.2', () => {
    // 0.2期待小于等于0.2
    expect(0.2).toBeLessThanOrEqual(0.2)
})

test('大于或者等于0.2', () => {
    // 0.2期待大于等于0.2
    expect(0.2).toBeGreaterThanOrEqual(0.2)
})

// 匹配字符串是否包含
test('test是不是包含在在这字符串里', () => {
    const item = 'testtest';
    expect(item).toMatch(/test/)
})

// 匹配数组和set中的内容

test('期望数组中存在1111', () => {
    const arr = [111, 1111, 22];
    expect(arr).toContain(1111);
});

// 匹配set中的内容

test('期望set中存在1111', () => {
    const arr = [111, 1111, 22];
    const set = new Set(arr);
    expect(set).toContain(1111);
});

// 匹配抛出异常的函数
// test('匹配函数中的异常', () => {
//     const callback = () => {
//         throw new Error('1');
//     }
//     // 期望函数返回异常， 并且异常的值是1
//     expect(callback).toThrow('1');
// });

8. 测试异步

// 异步测试，测试回调函数异步的方式
// 这里一定要调用done，否则request执行完毕，jest级判断用例执行完毕了， 调用了done，jest会判定调用完毕done才是执行完测试用例
test('测试回调函数异步, 返回值是不是{success: true}', (done) => {
    request((data) => {
        expect(data).toEqual({success: true});
        done();
    });
})


// 测试异步promise，期待正确返回结果的测试用例, 如果没有正确返回，就报错不通过
test('测试异步promise是不是正确返回{success: true}', async () => {
    // expect(request()).resolves 正确返回，并且期望匹配到返回的数据data:{success: true}，
    // 返回的数据就会在expect(request()).resolves中
    await expect(request()).resolves.toMathObject({
        data: {success: true}
    });
})

// 第二种先获取值在校验 测试异步promise，期待正确返回结果的测试用例, 如果没有正确返回，就报错不通过

test('测试异步promise是不是正确返回{success: true}', async () => {
    // 如果这里request()请求报错，那就直接测试用例不通过了
    const res = await request();
    expect(res.data).toEqual({success: true});
})

//  测试异步promise请求访问不到，期待服务端返回404， 如果是正确的就测试用例不通过
test('测试异步promise请求访问不到，服务端返回404', async () => {
    // expect(request()).rejects 错误返回，并且期望匹配请求的返回的，
    // 返回的数据就会在expect(request()).rejects返回报错信息中捕获错误
    await expect(request()).rejects.toThrow();
})

// 第二种先获取值在，对值进行校验 测试异步promise请求访问不到，期待服务端返回404， 如果是正确的就测试用例不通过
test('测试异步promise请求访问不到，服务端返回404', async () => {
    expect.assertions(1);
    await request().catch((e) => {
        expect(e.toString()).toEqual('Error 404');
    });
})

// 只有执行一次expect，测试用例才可能是通过， 否则测试用例都是不通过
expect.assertions(1);

// 如果测试用例里面代码没有执行expect， 而执行的都正常执行完毕了，那jest就默认认为测试用例通过了

9. jest 生命周期和分组


// jest 的生命周期和分组


// describe 是进行测试用例的分组的， 在进行分组的同时还会形成一个作用域

// 在外层如果包裹在describe 中就相当于外层包裹了一个describe， 所有最外层中的beforeAll还是第一个执行输出111111

// 在describe中直接些代码执行或者打印， 那么这些代码会在所有声命周期和所有测试用例之前被执行


// beforeAll 是这个分组中所有测试用例执行之前执行
beforeAll(() => {
    console.log(111111)
});

// 这个分组每个测试用例执行之前都会执行
beforeEach(() => {
    console.log('beforeEach111111')
});

// 这个分组中所有测试用例执行之后执行
afterAll(() => {
    console.log('after111111')
});

// 这个分组中每个测试用例执行之后执行
afterEach(() => {
    console.log('afterEach111111')
})

test('测试0', () => {
    console.log('测试000')
});

describe('我是最外层的测试用例分组', () => {

    // beforeAll 是这个分组中所有测试用例执行之前执行
    beforeAll(() => {
        console.log(222222)
    });

   // 这个分组每个测试用例执行之前都会执行
    beforeEach(() => {
        console.log('beforeEach222222')
    });

   // 这个分组中所有测试用例执行之后执行
    afterAll(() => {
        console.log('after222222')
    });

    // 这个分组中每个测试用例执行之后执行
    afterEach(() => {
        console.log('afterEach222222')
    })

    test('测试1', () => {
        console.log('测试1222222')
    });

    describe('第二层测试用例', () => {

        beforeAll(() => {
            console.log(44444)
        });

        beforeEach(() => {
            console.log('beforeEach44444')
        });

        afterAll(() => {
            console.log('after44444')
        });

        afterEach(() => {
            console.log('afterEach44444')
        })

        test('测试2', () => {
            console.log('测试24444')
        });
    })
});

describe('第二层外', () => {

    beforeAll(() => {
        console.log(555)
    });

    beforeEach(() => {
        console.log('beforeEach555')
    });

    afterAll(() => {
        console.log('after555')
    });

    afterEach(() => {
        console.log('afterEach555')
    })

    test('测试3', () => {
        console.log('测试3555')
    });
})

// before相关的声明周期是从外往里执行的，after相关的的生命周期是从里往外执行的

// jest 每次只会执行一个分组中的一层测试用例，如果最外层没有describe包裹， 但是写了生命周期，也有定义test测试用例，
// 那么最外层的生命周期和它下一层的describe中的生命周期都会被调用， 并且会执行它下一层的describe中的哪一层测试用例

// 并且会把最外层的分组的第一个子分组中的所有分组都执行完毕之后才会， 才会执行最外层的分组的第二个子分组

### 例子对应的结果

✓ 测试0 (1ms)
  我是最外层的测试用例分组
    ✓ 测试1 (2ms)
    第二层测试用例
      ✓ 测试2 (14ms)
  第二层外
    ✓ 测试3 (2ms)

  console.log test/main.test.js:13
    111111

  console.log test/main.test.js:18
    beforeEach111111

  console.log test/main.test.js:32
    测试000

  console.log test/main.test.js:28
    afterEach111111

  console.log test/main.test.js:39
    222222

  console.log test/main.test.js:18
    beforeEach111111

  console.log test/main.test.js:44
    beforeEach222222

  console.log test/main.test.js:58
    测试1222222

  console.log test/main.test.js:54
    afterEach222222

  console.log test/main.test.js:28
    afterEach111111

  console.log test/main.test.js:64
    44444

  console.log test/main.test.js:18
    beforeEach111111

  console.log test/main.test.js:44
    beforeEach222222

  console.log test/main.test.js:68
    beforeEach44444

  console.log test/main.test.js:80
    测试24444

  console.log test/main.test.js:76
    afterEach44444

  console.log test/main.test.js:54
    afterEach222222

  console.log test/main.test.js:28
    afterEach111111

  console.log test/main.test.js:72
    after44444

  console.log test/main.test.js:49
    after222222

  console.log test/main.test.js:88
    555

  console.log test/main.test.js:18
    beforeEach111111

  console.log test/main.test.js:92
    beforeEach555

  console.log test/main.test.js:104
    测试3555

  console.log test/main.test.js:100
    afterEach555

  console.log test/main.test.js:28
    afterEach111111

  console.log test/main.test.js:96
    after555

  console.log test/main.test.js:23
    after111111

10. test.only('only表示所有的测试用例中，只执行这个测试用例', () => {

})



11. jest Mock函数和 Mock改变npm包或者函数


import axios from 'axios';

// 劫持了axios， 可以控制axios
jest.mock('axios');

// 测试请求
const requestBaidu = () => {
    return axios.get('https://www.baidu.com/');
}

//测试函数
const testfn = (fn) => {
    fn('1111');
}

describe('mock测试组', () => {
    // jest 测试请求，请求发出去了就说明测试通过了，因为返回结果归后端测试，只要请求能发出发前端就没问题
    // 测试异步promise 必须return 这个promise，或者 在这个promise前面加上await， 要不不能正常的执行测试用例
    test('mock测试用例', async () => {
        // 劫持axios， 模拟axios get请求的返回值
        axios.get.mockResolvedValue({data: 1111});
        // 模拟一次get请求返回结果
        // axios.get.mockResolvedValueOnce({data: 1111})
        const data = await requestBaidu();
        // 写一个断言， 将模拟的返回值和我们期望的返回值做比对
        expect(data).toEqual({data: 1111})
    });

    test('mock test, 自己mock的函数测试用例', () => {
        // 自己写一个函数当做mock函数
        const fn1 = jest.fn(() => {
            return 1111;
        });

        // mockImplementation对已有的调用的mock函数进行在次定义
        // fn1.mockImplementation(() => 88888888)
         // mockImplementation对已有的调用的mock函数进行一次重新定义
        fn1.mockImplementationOnce(() => 88888888)


        // 时候默认创建出来的mock函数， 指定调用后的返回值
        const fn2 = jest.fn();
        fn2.mockReturnValue(99999);
        // 模拟fn2一次调用的返回结果
        // fn2.mockReturnValueOnce(99999)
        testfn(fn1)
        testfn(fn1)
        testfn(fn1)
        testfn(fn2)
        testfn(fn2)
        testfn(fn2)

        // 断言当前这个fn1 mock函数在testfn函数中被调用
        expect(fn1).toBeCalled();
        // 断言当前这个fn1 mock函数被调用时实参是1111
        expect(fn1.mock.calls[0]).toEqual(['1111'])

        console.log('fn1', fn1.mock);
        console.log('fn2', fn2.mock);
    });
});

// 相同mock函数调用多次，calls中多个数组是同一个mock函数多次调用的实参
// instances 中是同一个mock函数多次调用时， 函数内部的this指向
// invocationCallOrder 是同一个函数多次调用时，每次调用时的顺序
// results是同一个函数多次调用时， 每次调用模拟的返回结果
// fn1.mock 返回的值
// fn1 { calls: [ [ '1111' ], [ '1111' ], [ '1111' ] ], mock被调用的时候传给实参
// instances: [ undefined ], 函数内部的this指向值
// invocationCallOrder: [ 2, 3, 4 ], 表示这个mock函数被调用时候的顺序， 这个顺序是和所有的测试用例在一起比的不是只和mock函数比
// results: [ { type: 'return', value: 1111 }, { type: 'return', value: 1111 }, { type: 'return', value: 1111 } ] } // 表示mock函数被调用的时候，自己模拟的返回值


测试请求第二种方式，创建一个__mocks__目录， 在__mocks__中创建一个和我们引用模块相同名称的js文件， 这个时候我们在测试用例文件中，引用我们源文件， 会直接变成引用__mocks__中创建创建的和原模块相同名称的js文件， 达到mock的效果


// 我们import { bbb } from '../demo.js';的时候是从__mocks__目录下的demo.js文件中获取API

// jest.unmock是在import { bbb } from '../demo.js'的时候，取消从__mocks__目录下的demo.js文件中获取API
// jest.unmock('../demo.js');
import { bbb } from '../demo.js';

// jest.requireActual从我们业务的使用里真实的demo.js文件中获取api
const { aaa } = jest.requireActual('../demo.js');

test('mock 请求测试用例bbb', async () => {
    await bbb().then((data) => {
        expect(data).toEqual(111111);
    });
})

test('mock 请求测试用例aaa', async () => {
    await aaa().then((data) => {
        expect(data).toEqual(111111);
    });
});

12. jest 中快照使用

jest中的快照就是第一次匹配的时候默认通过存为快照，之后比对的时候会根据快照作为标准比对

如果快照校验不通过 通过u更新快照，下次就以新的快照作为比对的标准了

如果多个快照校验都不通过, 先进入i模式 询问校验，让后每个校验单独执行u模式更新快照， 下次校验的时候以新的快照作为比对的标准

import { Config, Config1 } from "../demo.js";

// test('快照测试用例', () => {
//     expect(Config).toMatchSnapshot({
//         time: expect.any(Date)
//     });
// });

// test('快照测试用例1', () => {
//     // 使用toMatchSnapshot 会产生一个存储快照的文件__snapshots__，在和测试用例文件相同的目录中
//     expect(Config1).toMatchSnapshot({
            // 可以设置我们检验的属性的类型， 只要满足这个类型就可以通过， 不需要值必须一样
//         time: expect.any(Date)
//     });
// });

test("快照测试用例不是产生快照文件，快照文件产生在测试用例文件内部", () => {
  // 快照文件产生在测试用例文件内部(如： `
    // Object {
    //     "ENV": "dev1",
    //     "time": Any<Date>,
    //   }
    // `), 不在和测试用例文件相同的目录中产生一个存储快照的文件__snapshots__
  // 这个行内模式需要安装npm包 prettier
  expect(Config1).toMatchInlineSnapshot(
    {
      time: expect.any(Date),
    },
    `
    Object {
      "ENV": "dev1",
      "time": Any<Date>,
    }
  `
  );
});

13. jest 模拟 计时器

import { timer } from '../demo.js';

beforeEach(() => {
    // 模拟计时器， 模拟定时器已经过去的时间, 和模拟立即执行计时器回调
    jest.useFakeTimers();
})

test('jest 模拟计时器测试', () => {
    const fn = jest.fn();
    timer(fn);

    // 立即执行所有计时器回调
    // jest.runAllTimers();
    // 只执行正处在队列中的计时器（正常代码中的， 正在倒计时， 或者倒计时完毕，已经进入异步队列的情况）
    // jest.runOnlyPendingTimers();
    // 设置过去多久了， 然后后面在对函数进行断言， 多次调用，时间是累加的
    jest.advanceTimersByTime(3000)
    // 调用两次， 表示时间过去了六秒，然后在继续校验，计算时间是以jest.useFakeTimers();宿主的，每重新jest.useFakeTimers();一次，这个时间都是从头开始的
    jest.advanceTimersByTime(3000)
    // 断言fn函数已经在计时器中被执行了一次
    expect(fn).toHaveBeenCalledTimes(1);
});

14. mock 类
单元测试：就是对单独的一个模块或者方法本事的逻辑进行测试， 而不对它引用依赖的逻辑进行

集成测试：是对单个模块获取方法测试， 并且对其中引用的依赖也进行测试

// jest.mock 导入的如果是一个类， 那就会将这个类自动转化为jest.fn()的实例，用这个实例充当构造函数，将类中的方法也都转化成jest.fn的实例
jest.mock('../demo.js');

// 也可以在__mocks__中直接定义一个demo.js文件， 在里边直接通过jest.fn() 定义Util和Util中的a， b方法，可以覆盖jest.mock默认的转换
// 在测试demoUtil的时候， 内部有类可以直接mock引入这个类, 就可以在调用这类的时候，跟踪这个的类的相关进程了
import Util from '../demo.js';
import demoUtil from '../demo1.js';

test('mock 类', () => {
    demoUtil();
    // Util类被调用了，在demoUtil执行完毕的时候， 这里弱化了对Util验证， 所以这就是demoUtil的单元测试
    expect(Util).toHaveBeenCalled();
});

15. jest 测试dom， jest中可以直接使用jquery， 操作dom获取dom结果，然后在对结果进行校验，jest中直接可以使用jquery是因为jest内部实现了dom api

16. TDD

TDD 测试驱动开发，就是先写测试用例在根据测试用例编写代码

17. 在package.json 配置jest字段也是可以配置jest的配置，和配置jest.config.js效果相同, 具体可以参考create-react-app 创建处理的项目

18. enzyme

enzyme 使用jest的一个辅助工具, 通过enzyme对组件的转化，可以被jest测试

jest-enzyme 这个包， 是在jest测试enzyme转化的组件的时候， 给jest 增加一下测试组件专有的匹配器

enzyme和jest-enzyme 使用， 看一下， github的文档说明

只有被enzyme处理后得到的结果才能被jest测试

enzyme 就是将react组件处理后， 可以让我们获取组件内部状态，属性还有方法， 还可以让我们给组件内部传值， 还可以在测试用例中调用组件内部的方法，达到对应状态， 然后再去测试调用后的结果

19. 自定义ts的声明文件， 只要是放在ts配置中ts会去查找自定义ts声明的位置， 这个声明文件就能生效

声明文件就是使用ts开发的代码编译之后会变成js， 之前的ts 类型约束都没了， 所以编写对应的声明文件，让我别人在ts中使用这个js文件的，可以知道js文件对应的ts规则， 在使用对应的api的时候，对应API的ts校验还会生效， 声明文件中约束的API名称， 需要和库中导出的API名称相同, 声明文件也可以定义全局接口和类型，直接接口和类型可以直接在我们的ts文件中使用

全局声明声明文件主要有以下几种语法：

declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
declare module 声明模块

这个declare全局声明就在自定义声明文件中才是全局的

npm 包声明声明文件

export 导出变量
export namespace 导出（含有子属性的）对象
export default ES6 默认导出
export = commonjs 导出模块

declare在npm的声明文件中， 就是定义文件中的局部声明

声明合并： 就是将相同名称的声明，功能合到一起，都起作用

写作为子属性的函数声明的时候就是用ts写一个函数， 然后没有返回值的形式

定义在package.json 的types 和typings字段上的ts 声明文件就是npm包声明文件

放在node_modules 的@types目录下的对应包名下的index.d.ts 文件，会被ts自动应用

在声明文件中通过这种方式引入其他声明文件
/// <reference path="global.d.ts" />

// 例如创建一个 typed-css.d.ts ts声明文件, 这样我们就可以在ts文件中, 通过css 模块化的形式引用.scss和.less 文件了， 这样就可以在ts文件中实现css module了， 正常的js中css module 只需要在css-loader中配置一下就可以了, ts css module 还需要特殊的css-loader(typings-for-css-modules-loader)， 所以不能用直接用css-loader，css-loader 还必须是1.0.0版本的

// typed-css.d.ts
// scss模块声明
declare module '*.scss' {
  const content: {[key: string]: any}
  export = content
}
// less模块声明
declare module '*.less' {
  const content: { [key: string]: any }
  export default content
}

20. 执行测试用例可以看到我们写的测试用例哪些通过了,那些没有通过

而查看测试覆盖率是， 是看项目中， 那些代码被被测试了， 覆盖率如何


21. 写公共组件， 或者功能方法， 适合每个组件和方法使用单元测试

测试我们的业务逻辑单元测试就是和业务耦合了， 就太多了，就不适合了， 这个时候就适合用集成测试了

TDD 适合和单元测试一起使用， 测试公共方法， 公共组件
TDD 就是根据我们的业务逻辑写测试用例, 是测试我们写的代码， 是白盒测试， 测的更加底层， 更加细，
因为只需要测试我们单独测试我们单元的所以只需要获取到组件这一层就行了，所以使用shallow获取浅层组件， 其他深层的直接简化就可以了不关注，因为写的是单元测试，就是关注单元这一层

BDD 就是根据用户的操作写测试用例, 就是写用户进行什么操作，让然后应该得到什么结果， 不关注具体代码实现是否正确，是黑盒测试 只关注功能，测试的是整体， 不关注细节

BDD 适合和集成测试一起使用

集成测试需要测整体所以可以获取每一层的组件，所以需要用mount获取组件， 这能获取每一层组件













