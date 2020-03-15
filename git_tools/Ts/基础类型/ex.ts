// 枚举类型, 模拟接口返回的数据 ， 并处理

enum Product {
  "待出库" = 1,
  "发货中" = 2,
  "待签收" = 3,
  "已完成" = 9
}

// type list = {
//   name: string;
//   state: string | number;
// };

interface list<T> {
  name: string;
  state: T;
}

// 继承类型
// type oldList = list & { state: number };
// type newList = list & { state: string };

let orderStatus: list<number>[] = Array.from({ length: 5 }, () => ({
  name: Math.random().toString(10),
  state: [1, 2, 3, 9][Math.floor(Math.random() * 4)]
}));

/**
 * 格式化list
 * @param arr
 */
function formatData(data: list<number>[]) {
  return data.map(item => ({ ...item, state: Product[item.state as number] }));
}
let res_: list<string>[] = formatData(orderStatus);

// console.log(orderStatus, res_, "xxx");

// 可索引接口 定义了数组或对象的规范
interface StringArr {
  [index: string]: string;
}

let obj: StringArr = { name: "222" };

// 函数类型接口
type fn = {
  (a: number): number;
};
type fType = (a: number) => number;
interface fn2 {
  (f: fType): fType;
}

let adds: fn = (v: number) => {
  return v + 1;
};

let adds2: fn2 = (f: fType) => {
  console.log("我执行了");
  return f;
};
// 高阶函数
function addOne(params: number) {
  return params + 1;
}
let hoc = adds2(addOne);
console.log(hoc(10));

// ex:定义一个高阶函数，接收add10函数和cheng5，返回一个函数，该函数传递一个 名字, 返回了谁调用了，值是多少
type num<T> = (n: T, val1?: number, val2?: number) => T;

interface HocFn {
  (fn1: num<number>, fn2: num<number>): num<string>;
}

function add10(v: number): number {
  return v + 10;
}
function cheng5(v: number): number {
  return v * 5;
}

let handleHocFn: HocFn = (f1, f2) => {
  return (name: string, val1: number = 1, val2: number = 1) => {
    let res = f1(val1) + f2(val2);
    return `${name}调用啦，结果是${res}`;
  };
};

let r = handleHocFn(add10, cheng5);
console.log(r("狗子", 10, 10));

// 结构

type obj = {
  type: string;
  url: string;
  data: string;
  success: Function;
};
function ajax(
  { type, url, data, success }: obj = {
    type: "post",
    url: "jjj",
    data: "name=ha",
    success(val: undefined | string) {
      console.log("success", val);
    }
  }
) {
  console.log(type, url, data, success, "data");
  success(data);
  // return {
  //   type: "x",
  //   url: "x",
  //   data: "x",
  //   success() {}
  // };
}
console.log(ajax());

// 获取接口的某个属性
interface Ex1 {
  arr: number[];
  obj: { name: string; age: number };
}
// 摘取了新的接口pick，从ex1中取了obj对象作为新接口
let arr1: Pick<Ex1, "obj"> = { obj: { name: "xx", age: 12 } };

export {};
