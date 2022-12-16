### 运算符号 用在类型中的
1. 非空运算符 !， let a = 'cccc'; (a!表示a不可能是undefined 和null)

2. & 且运算符，将类型合并成一个类型，如果是对象类型合并成一个对象类型，有相同属性，属性之间继续合并（无限层级），简单类型合并成没有的类型就变成了never类型

3. ｜ 或运算符， 表示是几个中的一个就行， type test = 'test' | 'test1', let a: test; a 是'test' 或 'test1'都符合类型

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

### 工具类型，就是处理类型产生新的类型

1. Partial<T>, 将出入的类型变成全部可选的类型并返回
2. Required<T>, 将出入的类型变成必选的类型并返回

### 数据类型
never、enum
