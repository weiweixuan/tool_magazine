// 布尔类型
let bool: boolean;
bool = true;
// console.log(bool, "bool");

// 数字类型
let num: number;
num = 12;
// console.log(num, "num");

// 字符串类型
let str: string;
str = "hello";
// console.log(str, "str");

// 数组类型
// 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
let arr: number[] = [];
arr.push(1);
// console.log(arr);

// 第二种方式是使用数组泛型，Array<元素类型>：
let arr2: Array<number> = [];
arr2.push(2);
// console.log(arr2);

// 元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let yz: [number, string];
yz = [1, "a"];
// yz = ['a',1] 飘红
// console.log(yz[0]);
// console.log(yz[1]);

// 联合类型
let word: string | number;
word = "222";
word = 11;
// word = true; //飘红

// 定义数组
let arr_: Array<string | number> = ["22"];
arr_.push(1);
// console.log(arr_, "xx");
let arr_2: (number | string | boolean)[] = [1, 2, "3"];
arr_2.push(false);

// 元祖类型
let tuple: [number, string, boolean];
tuple = [1, "s", true];

// 枚举类型
enum Status {
  error = 0,
  "支付成功" = 1,
  "支付失败" = 2
}

let payMent = Array.from({ length: 10 }, _ => ({
  payMoney: 10,
  status: Math.floor(Math.random() * 3)
}));

interface Item {
  payMoney: number;
  status: number;
}
function formatData(params: Item[]): object {
  return params.map(item => {
    return {
      payMoney: item.payMoney,
      status: Status[item.status]
    };
  });
}
// console.log(payMent, formatData(payMent), "xxx");

// never类型
// let n: never;
// n = (() => {
//   throw new Error("xxx");
// })();

// 函数

function fun1(params: string): number {
  return params.length;
}

let fun2: (params: string) => number = function(params: string): number {
  return params.length;
};
// console.log(fun1("234"), fun2("123"));

function optionsFn(name: string, age: number = 20): string {
  return `${name}===> ${age ? age : 0}`;
}

// console.log(optionsFn("weiwei"));

// 剩余参数
function reset(name: string, ...other: any[]): void {
  console.log(name, other, "hhh");
}
// console.log(reset("微微", 1, 2, 3, 4, 5));

// 函数的重载
function add(str: string): string;
function add(age: number): string;
function add(params: any) {
  if (typeof params === "string") {
    return `${params},我是字符串类型`;
  } else {
    return `${params},我是数字类型`;
  }
}

// console.log(add("weiwei"));
// console.log(add(123));

// es6的类 在ts中的使用
class Father {
  // 类里面的修饰符 ： public(外部，内部，子类都可以访问) protected(内部，子类都可以访问) private(只有类内部访问)  默认是public
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  work(): string {
    let res = `${this.name}在工作！`;
    console.log(res);
    return res;
  }
}

// 子类
class Child extends Father {
  age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  sayHi(): string {
    return `我叫${this.name},我今年${this.age}岁啦`;
  }
  work(): string {
    super.work(); // 执行父类的方法
    return "子类的工作方法";
  }
}

let f = new Father("爸爸");
// console.log(f.name); // public 外部可以访问 , protected 不可以访问
let c = new Child("儿子", 18);
// console.log(c.work());

// 抽象类，定义一个标准，让子类实现
abstract class F {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract say(): any; // 定义了一个say的标准
}

class C extends F {
  constructor(name: string) {
    super(name);
  }
  say() {
    return "定义成功！";
  }
}

// 接口
interface params {
  name: string;
  age: number;
  skill?: string;
  [propName: string]: any; // 其他属性
}

function showItem(params: params): string {
  const { name, age } = params;
  return `${name},我今年${age}岁了`;
}

// console.log(showItem({ name: "weiwei", age: 25 }));

interface sha1 {
  (name: string, age: number, skill?: string): string;
}

// let sha1Fn: sha1 = function(name, age) {
//   return `${name}+${age}`;
// };

let sha1Fn: sha1 = (name, age) => {
  return `${name}+${age}`;
};
// console.log(sha1Fn("哈哈哈", 12));

interface MyArr {
  [index: number]: string;
}
let arr_my: MyArr = ["1", "2"];

interface MyObj {
  [index: string]: string;
}

let obj_my: MyObj = { 1: "ss", name: "iii" };

// 接口对类的实现
interface PersonLei {
  name: string;
  eat(food: string): string;
}
// 实现这个类
class PLei implements PersonLei {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(food: string) {
    return `${this.name} 吃了 ${food}`;
  }
}

let leijiek = new PLei("狗子");
// console.log(leijiek.eat("狗屎"));

interface WebLei extends PersonLei {
  age: number;
  say(what: any): string;
}

class WLei extends PLei implements WebLei {
  age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  say(what: string): string {
    return `${this.name} -- 说了 -- ${what}`;
  }
}

let leiWeb = new WLei("二蛋", 24);
// console.log(leiWeb.eat("鸡蛋"));
// console.log(leiWeb.say("好吃"));

// 泛型 : 传入的类型自己定义
function getData<T>(params: T): T {
  return params;
}

// console.log(getData<string>("111")); // 可以指定输入的类型
// console.log(getData(23)); // 直接传值，函数会类型推论得出泛型的类型

// 函数类型接口
interface ConfigFn {
  (val1: string, val2: string): string;
}

let getData1: ConfigFn = (value1: string, value2: string): string => {
  return value1 + value2;
};
// console.log(getData1("狗子", "你今天不乖啊"));

// 泛型接口
// 第一种
interface FanxingOptions11 {
  <T>(val: T): T;
}

let getData11: FanxingOptions11 = <T>(val: T): T => {
  return val;
};

// console.log(getData11("string")); //很灵活
// console.log(getData11(123));

// 第二种
interface FanxingOptions22<T> {
  (val: T): T;
}

let getData22: FanxingOptions22<string> = (val: string): string => {
  return val;
};
// console.log(getData22("字符串"));

// example1

interface IUser {
  userName: string;
  pwd: string;
}

class User implements IUser {
  userName: string;
  pwd: string;
  constructor({ userName, pwd }: IUser) {
    this.userName = userName;
    this.pwd = pwd;
  }
}
class MysqlDb {
  constructor() {}
  add<T>(info: T): boolean {
    console.log(info);
    return true;
  }
}

var user = new User({
  userName: "张三",
  pwd: "123456"
});

var Db = new MysqlDb();
// Db.add(user);

// 命名空间
namespace A {
  export function getName(params: string): string {
    return "我是A空间的获取名称方法，" + params;
  }
}

namespace B {
  export function getName(params: string): string {
    return "我是B空间的获取名称方法，" + params;
  }
}

let a_name: string = A.getName("aaaa");
let b_name: string = B.getName("bbbb");

// console.log(a_name, b_name, "结果");

// 装饰器

// 1.1类装饰器
// function logClass(params: any) {
//   console.log(params, "sss");  // 类
// }

// @logClass
// class nameClass {
//   constructor(parameters: string) {}
// }

// let w_a = new nameClass("miaomi");

// 1.2类装饰器 （传参型）
// function logClass(params: any) {
//   console.log(params, "sss");  // 传入的参数 type
//   return (class_: any) => {
//     console.log(class_, "类型");  // 装饰的类
//   };
// }

// @logClass("type")
// class nameClass {
//   constructor(parameters: string) {}
// }

// let w_a = new nameClass("miaomi");

// 1.3类装饰器 （增强类）
function logClass(params: any) {
  console.log(params, "sss"); // 传入的参数 type
  return (class_: any) => {
    console.log(class_, "类型"); // 装饰的类
    // 返回一个增强的类
    return class extends class_ {
      public url = "new url";
      getUrl() {
        return this.url;
      }
    };
  };
}

// @logClass("type")
// class nameClass {
//   public url: string | undefined;
//   constructor(url: string) {
//     this.url = url;
//   }
//   getUrl(): string {
//     return `url是${this.url}`;
//   }
// }

// let w_a = new nameClass("http:www.baidu.com");
// console.log(w_a.getUrl());
// 2.属性装饰器

function getProps(type: string) {
  return (proto: any, attr: string) => {
    console.log(proto, attr, "xxx");
    proto[attr] = "new Url";
  };
}
class PropClass {
  constructor(url: any) {
    // public url: string | undefined;
    // this.url = url;
  }
  getUrl() {
    // return this.url;
  }
}

let u1 = new PropClass("old url");
console.log(u1.getUrl());
