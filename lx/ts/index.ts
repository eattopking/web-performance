
//一、 运算符验证

// 交叉类型验证 且运算符 &
interface Ojb1 {
  a: {
    c: string;
    a: string;
  }
}

interface Ojb2 {
  a: {
      c: string;
      f: string;
    }
}

type Obj3 = Ojb1 & Ojb2;

let c: Obj3 = {
  a: {
    a: '1',
    c: '2',
    f: '6'
  }
}

type A = {
  [K in keyof Obj3]?: string
};

// 联合类型验证 或运算符 ｜

type Other = string | number | object;

// 非空运算符
let a = '11q';
a!.length // !表示a不可能是undefined和null

// 减运算符，-, 可选运算符，?

type Obj = {
  a?: string;
  b?: number;
}

type Nobj = {
  [K in keyof Obj]-?: Obj[K];
}

// 二、关键字验证

// 联合类型形式的key遍历 keyof， 遍历关键字，in，获取整体的类型结构 typeof
const obj = {a: 1, b: '2'};

type Keys = typeof obj;

type Nkeys = {
  [K in keyof Keys]?: Keys[K];
}

// 定义新泛型类型 infer 

type Ntype<T> = T extends {b: infer A; c: infer A} ? A : never;

type Nstr = Ntype<number>;
type Nstr2 = Ntype<{b: string; c: number}>;
type Nstr3 = Ntype<{b: number; c: number}>;

// 代码中in 关键字 判断是否在包含对应字段
const obj1: {test: number} = {test: 1111};
console.log('test' in obj1);

// extends 接口继承接口和接口继承类
interface Test {
  a: string;
  b: number;
}

interface TestCopy extends Test {
  c: number;
};

class TestClass {
  a: string;
  b: number;
}

interface TestClassCopy extends TestClass {
}

// extends 限制工具类型的泛型类型

type Picks<T, K extends keyof T> = {
  [k in K]: T[k];
}

type Obj = Picks<{b: string; c: number}, 'c'>;

// 三、工具函数

// partial

type Partials<T> = {
  [K in keyof T]?: T[K];
}

type PartialsDemo = Partials<{c: string; d: string;}>

// required

type Requireds<T> = {
  [K in keyof T]-?: T[K]
}

type RequiredsDemo = Requireds<{a?: string; b?: string;}>

// readonly

type Readonlys<T> = {
  readonly [K in keyof T]: T[K];
}

type ReadonlysDemo = Readonlys<{a: string; b: string;}>

// record

type Records<K, T> = {
  [k in K]: T;
}

type RecordsDeomo = Records<'a'|'b', string>

// pick

type Pickss<T, K extends keyof T> = {
  [k in K]: T[k]
}

type PickssDemo = Pickss<{a: string; b: string; c: number}, 'a' | 'b'>;

// exclude
type Excludes<T, U> = T extends U ? never : T;// 后面的T和前面的联合类型T拆分出来的每一项的对应的，后面的T不是一整个联合类型

type ExcludeDomo1 = 'a' | 'b' | 'c';
type ExcludeDomo2 = 'a' | 'b';
type ExcludeDomo3 = Excludes<ExcludeDomo1, ExcludeDomo2>;

type ExcludeDomo4 = never | never | 'c' // 'c' never 是所有类型的子类型，不能作为联合类型中的一项，所这里就不是联合类型了而是一个普通的类型'c'


// omit 

type Omits<T, K> = {
  [k in Excludes<keyof T, K>] : T[k];
}

type OmitsDomo = Omits<{a: string; b: string;}, 'a'>;


// extract

type Extracts<T, U> = T extends U ? T : never;

type ExtractsDemo = Extracts<'a'|'c'|'b', 'a'|'b'>;

// Nonnallable

type Nonnallables<T> = T extends undefined | null ? never : T;

type NonnallablesDemo = Nonnallables<'a'| 'c'| null>;

// returntype, 还需要搞懂如何实现的
const testFun = (a: string) => 111;
type Returntypedeom = ReturnType<typeof testFun>

// parameters,还需要搞懂如何实现的

type ParametersDemo = Parameters<typeof testFun>[0]

// 这是一个参数类型列表，类似一个数组，也可以通过索引取到类型，索引取到的是具体类型，就没有参数的值了
type ArrayDemo = [a: string, b: number][0];


//三、接口

// 函数接口
interface Fun {
  (a: string): void
}

const f:Fun = (a: string) => {}






