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