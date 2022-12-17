### 运算符号 用在类型中的
1. 非空运算符 !， let a = 'cccc'; (a!表示a不可能是undefined 和null)

2. & 且运算符，将类型合并成一个类型，如果是对象类型合并成一个对象类型，有相同属性，属性之间继续合并（无限层级），简单类型合并成没有的类型就变成了never类型

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

### 关键字， 用在正常代码中的

1. in， 判断一个字段是否在对象中， 比如 let a = {c: 1111}, c in a 就是true

### 工具类型，就是处理类型产生新的类型

1. Partial<T>, 将出入的类型变成全部可选的类型并返回
2. Required<T>, 将出入的类型变成必选的类型并返回

### 数据类型
never、enum、字面量类型（比如：'test'、1 这种具体的值作为类型时就叫做字面量类型）

### 泛型， 泛型就是先用一个类型变量占位，在真正使用的时候将类型变量替换为确定的类型

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



### 概念

1. 类型保护，就是在真正的代码中在判断一下类型是否正确或者字段是否存在， 这就是类型保护

2. 断言， 就是保证一个值是一个类型，让ts检测不报错， 两种写法 1. let a = 1111; let c = <number>a;   2. let a = 1111; let c = a as number; 这两种断言是等价的， 但是react只能用as 断言， 因为尖括号会被react识别为jsx

3. 