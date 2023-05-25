ts的本质就是在定义和调用的时候做约束

### ts 编译
全局安装ts可以使用tsc指令了，ts官网提供的编译命令就是tsc
$ npm install -g typescript 
 //或
$ yarn global add typescript

tsc 指令可以将ts直接编译成js



### 运算符号 用在类型中的
1. 非空运算符 !， let a = 'cccc'; (a!表示a不可能是undefined 和null)

2. & 且运算符，将类型合并成一个类型，如果是对象类型合并成一个对象类型，有相同属性，属性之间继续合并（无限层级），简单类型合并成没有的类型就变成了never类型， 通过&符号拼接的类型叫做交叉类型

3. ｜ 或运算符， 表示是几个中的一个就行， type test = 'test' | 'test1', let a: test; a 是'test' 或 'test1'都符合类型， 用｜拼接出来的类型叫做联合类型

keyof 取出来的类型， 或者枚举直接作为属性时候的使用,如果有多个值，也是和用｜拼接的形式一样的

4. -? 运算符， 去掉可选

type TEST1 = {
    test1?: number;
    test2?: string;
};

type TEST2 = {
    [P in keyof TEST1]-?: string;
}

interface TEST2 {
    test1: string;
    test2: string;
}

这两个TEST2效果相同

### 关键字 用在类型中的

1. in 遍历 ｜拼接的类型关键字 

type TEST1 = 'test1' | 'test2';

type TEST2 = {
 [P in TEST1]: string 
}

type TEST2 = {
 test1: string;
 test2: string;
}

两个TEST2效果是相同的

2. typeof 取出真实值所对应的类型结构
let a = {
    f: 1,
    b: 'sss'
}
type TEST = typeof a;

type TEST = {
    f: number;
    b: string;
};

两个TEST的效果是相同的

3. keyof 取出对象类型中的key 并用 ｜ 拼接， 如果key只有一个那就直接去除那个key值

4. extends, 在类型是使用extends 就是返回true或者false用于判断
type Info<T> = T extends <{a: infer U; b: infer U}> ? U : never;

type Test = Info<{a: number; b: string}> 最后结果type Test = number ｜ string;
type Test = Info<{a: number; b: number}> 最后结果type Test = number;
type Test = Info<number> 最后结果type Test = never;

如果 T 的传值字段和  <{a: infer U; b: infer U}>相同， 就是说明T 继承自<{a: infer U; b: infer U}>，

T extends <{a: infer U; b: infer U}>就返回true， type Info的类型就是U，否则是never，然后如果U的类型相同类型就是单一的，否则不同的类型将通过｜组成联合类型

5. infer 可以声明类型变量，可以用在判断中产生一个新的类型， 例如上面

6. is 在类型中明确类型的，感觉类似是断言，暂时没看出来有啥用

function isNumber(x: any): x is number { //默认传入的是number类型
  return typeof x === "number"; 
}

console.log(isNumber(7)) // true
console.log(isNumber('7')) //false
console.log(isNumber(true)) //false


### 关键字， 用在正常代码中的

1. in， 判断一个字段是否在对象中， 比如 let a = {c: 1111}, c in a 就是true

### 工具类型，就是处理类型产生新的类型

1. Partial<T>, 将传入的对象类型变成全部可选的类型并返回
2. Required<T>, 将传入的对象类型变成全部必选的类型并返回
3. Readonly<T>, 将传入的对象类型变成全部只读的类型并返回
4. Record<K, T>, K（传入typeof 取出的 ｜拼接的联合类型），T是任意类型，返回结果是一个Key值都是T类型的对象类型
将对象类型中的字段都替换成一个类型， 返回一个新的对象类型

参数是一个联合类型和一个任意类型

type Test = 'test' | 'aaaa';
type Object = Record<Test, number>, Object最后的结果就是type Object = {
    test: number,
    aaaa: number
}
5. Pick<K, T>, 就是取出一个对象类型中一部分组成一个新的对象类型
从对象类型中挑选类型

将K这个对象类型中通过T类型取出指定的对象类型， T必须是typeof K 中的一部分


type Object = {
   a: number;
   b: string;
   c: object
}

type Test = Pick<Object, a | b>, 结果是type Test = {
   a: number;
   b: string;
}

6. Omit<T,K>, 提出对象类型中属性返回新类型
提出类型中的字段返回新的对象类型
type Test = Omit<{a: string; b: number}, 'a'>， 结果是type Test = {b: number}

7. Exclude<T, U>, 剔除T联合类型中的U类型
从类型中剔除类型，并改变原类型
数字
type Test = 1 | 2 | 3;
type Test1 = Exclude<Test, 3>, type Test1 = 1 | 2;

// 字符串类型
type info = "name" | "age" | "sex"
type info1 = "name" | "age" 
type infoProps = Exclude<info, info1> //  "sex"

// 类型
type typeProps = Exclude<string | number | (() => void), Function> // string | number

// 对象
type obj = { name: 1, sex: true }
type obj1 = { name: 1 }
type objProps = Exclude<obj, obj1> // nerver

8. Extract<T,K>, 在T类型中提取K类型中包含的类型返回
从联合类型中提取出重合类型
type Test = Extra<1 ｜ 2 ｜ 3, 1｜4>， 结果是type Test = 1；

9. NonNullable<T>, 去掉T联合类型中的undefind和null返回新的类型
去掉undefind和null类型
type Test = Omit<1｜2｜null>， 结果是type Test = 1｜2;
10. ReturnType<T>, 获取T函数类型的返回值类型
type Props = ReturnType<() => string>，结果为type Props = string；
type Props2 = ReturnType<any>; // any
type Props3 = ReturnType<never>; // any

11. Parameters<T>, 获取T函数类型的参数和参数类型，有参数和没有参数，都是以特定内容的数组类型返回
type Props = Parameters<() => string>，结果为type Props = [];
type Props = Parameters<(a: string) => string>，结果为type Props = [a: string];
type Props2 = Parameters<any>; // unknown[]
type Props3 = Parameters<never>; // never

### 数据类型
1. never
2. enum， 枚举类型的值只能字符串或者数字，纯数字的枚举叫做数字枚举，纯字符串的枚举叫做字符串枚举， 两者都有的枚举叫做异构枚举， 异构枚举没字符串中断后重新开始变为数字时需要有个起始值： 如 enum a {
    b,
    c,
    D = '7',
    f = 7,
    G
}

此时b为0，c为1，G为8
3. 字面量类型（比如：'test'、1 这种具体的值作为类型时就叫做字面量类型），字面量类型可以直接当做类型 如let a: 'test' = 'test';
4. 元组类型就是对一个数组项都明确类型的数组 如 let a: [number, string] = [1, '3'], 这就是元组，元组可以push新的内容，但是不能取新的内容值
5. Object表示所有原始类型和非原类型，除了null和undefined
6. object 就表示typeof 的结果等于object的所有类型
7. any、unknow、never 三个类型都是顶级类型，any和unknow的作用差不多，都表示任意， 但是unknow有两点更加严格，1. unknow类型的值只能赋值给unknow和any类型 2. 不能对unknow类型做任何操作，比如对象取值或者函数调用操作

### 泛型， 泛型就是定义类型变量可以多处占位的类型，可以不明确类型，调用的时候在设置类型， 也可以通过泛型继承明确类型变量的类型

泛型 在定义函数、接口、类、还有type 定义对象类型的时候使用

1. <T>, 通过一个尖括号定义泛型， 这个T就是类型变量，T表示类型型的类型
2. <T, U>, 定义泛型的时候定义多个类型变量
3. 定义泛型的时候可以使用任何字母表示类型变量都可以，比如 function a<F>(c: F): F[] {
    return [c];
}, 完全没问题

4. 有四种类型变量，大家有共识表示具体的类型 K表示键类型， T表示类型类型，E表示元素类型、V表示值类型
5. 泛型设置的时候还可以设置默认值，调用的时候不设置具体类型，就按照默认值类型， function a<F = string>(c: F): F[] {
    return [c];
} ，这就是给泛型设置默认值在定义的时候，和给函数的参数设置默认值一样

6. 泛型继承， 就可以类型变量通过继承一个类型来明确类型变量的类型， 所以在调用的时候用到类型变量的地方需要满足类型变量已经明确的类型

就像下面的例子
interface Test {
    length: number;
    test: string;
}

function a<T extends Test>(data: T): number {
    return data.length;
}

a<Test>({ length: 111, test: 'string' });

### 接口
1. 接口可以定义对象类型、可以定义函数类型、也可以定义类类型

定义函数类型就叫你接口

定义函数类型叫做函数接口

interface Props {
    (data: number): number
}

const teet: Props = (data) => {
    return data
}

定义类类型就是类接口

2. interface Props {
    a: string
} 和

type Props = {
    a: string
} 是等价的完全一样的，就是对象的类型

3. 接口可以定义多次相同的名称，最后和合并成一个整体使用，用那个相同的名称

interface A {
  a: string;
}
interface B {
  b: string;
}

最后使用时A是 {
  a: string;
  b: string;
}

4. 类型别名 type 不可以定义相同的

### 类
1. class Info {
    // 定属性定义只读等修饰，修饰符都是放在属性前面
    public readonly name3: string = ''; // 只读属性
    // 私有属性
    #myName = '私有名字';
    // 另一种定义私有属性的方法
    private myName2 = '私有名字';
    name2 = 111;
    //静态属性
    static name1 = 'Domesy';
    // 静态方法
    static test = () => {
        console.log(1111);
    }

    // 功能方法
    test1 = () => {
        // 获取私有属性
        console.log(this.#myName);
    }

    // 监听一个属性值赋值的set方法
    set name(value) {
        this.name2 = value;
    }

    // 监听一个属性值取值的get方法, 有get 必须有set
    get name() {
        return this.name2;
    }
}

2. 泛型类声明和使用

class Test <T>{
    a(value: T) {
    
    }
}

new Test<number>(1);

3. 修饰符

public：类中、子类内的任何地方、外部都能调用
protected：类中、子类内的任何地方都能调用,但外部不能调用
private：类中可以调用，子类内的任何地方、外部均不可调用

4. abstract 关键字

使用abstract 声明的类叫做抽象类， 通过abstract声明的类的方法叫做抽象方法

抽象类和抽象方法都是一个定义，用户可以继承或者实现这个类，但是要实现类中的方法和抽象方法才能使用

5. 类的重写和重载

重写就是继承或者实现一个类，对类的方法和属性进行重写

重载就是对类中的方法进行重载，就是函数的重载
### 概念

1. 类型保护，就是在真正的代码中在判断一下类型是否正确或者字段是否存在， 这就是类型保护

2. 断言， 就是保证一个值是一个类型，让ts检测不报错， 两种写法 1. let a = 1111; let c = <number>a;   2. let a = 1111; let c = a as number; 这两种断言是等价的， 但是react只能用as 断言， 因为尖括号会被react识别为jsx,
可以进行多重断言例如：const name1 = '小杜杜' as any as string;

3. 函数重载，就是在函数有多种参数类型和返回情况的时候，分别定义重载签名，保证我们可以看懂函数没有返回值请款的返回类型，也可以让ts去做正确的判断，然后我们在定义一个包含所有情况的返回类型的真实函数体， 调用的的时候根据情况，选择不同重载签名最后作为函数调用时候的参数类型和返回类型
function aaa(value: number): User | undefined
function aaa(value: string): User[]

function aaa(value:number|string):User|User[]|undefined{
    if(typeof value==='number'){
        return userList.find(item=>item.id===value)
    }else{
        return userList.filter(item=>item.grades===value)
    }
}

为了看懂参数类型产生的返回类型
为了在调用函数的时候获取正确参数类型和返回类型

4. 类中的构造函数重载，和函数重载想相同


### React 涉及的Ts

React.FC
React.ReactElement jsx
React.ReactNode 全部节点
React.CSSproperties 行内css style值
React.MutableRefObject useref值
React.MouseEvent<HTMLInputElement>, mouse、click 事件
React.FocusEvent<HTMLInputElement> focus 事件
React.ChangeEvent<HTMLInputElement> change事件