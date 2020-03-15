"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 布尔类型
var bool;
bool = true;
// console.log(bool, "bool");
// 数字类型
var num;
num = 12;
// console.log(num, "num");
// 字符串类型
var str;
str = "hello";
// console.log(str, "str");
// 数组类型
// 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
var arr = [];
arr.push(1);
// console.log(arr);
// 第二种方式是使用数组泛型，Array<元素类型>：
var arr2 = [];
arr2.push(2);
// console.log(arr2);
// 元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
var yz;
yz = [1, "a"];
// yz = ['a',1] 飘红
// console.log(yz[0]);
// console.log(yz[1]);
// 联合类型
var word;
word = "222";
word = 11;
// word = true; //飘红
// 定义数组
var arr_ = ["22"];
arr_.push(1);
// console.log(arr_, "xx");
var arr_2 = [1, 2, "3"];
arr_2.push(false);
// 元祖类型
var tuple;
tuple = [1, "s", true];
// 枚举类型
var Status;
(function (Status) {
    Status[Status["error"] = 0] = "error";
    Status[Status["\u652F\u4ED8\u6210\u529F"] = 1] = "\u652F\u4ED8\u6210\u529F";
    Status[Status["\u652F\u4ED8\u5931\u8D25"] = 2] = "\u652F\u4ED8\u5931\u8D25";
})(Status || (Status = {}));
var payMent = Array.from({ length: 10 }, function (_) { return ({
    payMoney: 10,
    status: Math.floor(Math.random() * 3)
}); });
function formatData(params) {
    return params.map(function (item) {
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
function fun1(params) {
    return params.length;
}
var fun2 = function (params) {
    return params.length;
};
// console.log(fun1("234"), fun2("123"));
function optionsFn(name, age) {
    if (age === void 0) { age = 20; }
    return name + "===> " + (age ? age : 0);
}
// console.log(optionsFn("weiwei"));
// 剩余参数
function reset(name) {
    var other = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        other[_i - 1] = arguments[_i];
    }
    console.log(name, other, "hhh");
}
function add(params) {
    if (typeof params === "string") {
        return params + ",\u6211\u662F\u5B57\u7B26\u4E32\u7C7B\u578B";
    }
    else {
        return params + ",\u6211\u662F\u6570\u5B57\u7C7B\u578B";
    }
}
// console.log(add("weiwei"));
// console.log(add(123));
// es6的类 在ts中的使用
var Father = /** @class */ (function () {
    function Father(name) {
        this.name = name;
    }
    Father.prototype.work = function () {
        var res = this.name + "\u5728\u5DE5\u4F5C\uFF01";
        console.log(res);
        return res;
    };
    return Father;
}());
// 子类
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    Child.prototype.sayHi = function () {
        return "\u6211\u53EB" + this.name + ",\u6211\u4ECA\u5E74" + this.age + "\u5C81\u5566";
    };
    Child.prototype.work = function () {
        _super.prototype.work.call(this); // 执行父类的方法
        return "子类的工作方法";
    };
    return Child;
}(Father));
var f = new Father("爸爸");
// console.log(f.name); // public 外部可以访问 , protected 不可以访问
var c = new Child("儿子", 18);
// console.log(c.work());
// 抽象类，定义一个标准，让子类实现
var F = /** @class */ (function () {
    function F(name) {
        this.name = name;
    }
    return F;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(name) {
        return _super.call(this, name) || this;
    }
    C.prototype.say = function () {
        return "定义成功！";
    };
    return C;
}(F));
function showItem(params) {
    var name = params.name, age = params.age;
    return name + ",\u6211\u4ECA\u5E74" + age + "\u5C81\u4E86";
}
// let sha1Fn: sha1 = function(name, age) {
//   return `${name}+${age}`;
// };
var sha1Fn = function (name, age) {
    return name + "+" + age;
};
var arr_my = ["1", "2"];
var obj_my = { 1: "ss", name: "iii" };
// 实现这个类
var PLei = /** @class */ (function () {
    function PLei(name) {
        this.name = name;
    }
    PLei.prototype.eat = function (food) {
        return this.name + " \u5403\u4E86 " + food;
    };
    return PLei;
}());
var leijiek = new PLei("狗子");
var WLei = /** @class */ (function (_super) {
    __extends(WLei, _super);
    function WLei(name, age) {
        var _this = _super.call(this, name) || this;
        _this.age = age;
        return _this;
    }
    WLei.prototype.say = function (what) {
        return this.name + " -- \u8BF4\u4E86 -- " + what;
    };
    return WLei;
}(PLei));
var leiWeb = new WLei("二蛋", 24);
// console.log(leiWeb.eat("鸡蛋"));
// console.log(leiWeb.say("好吃"));
// 泛型 : 传入的类型自己定义
function getData(params) {
    return params;
}
var getData1 = function (value1, value2) {
    return value1 + value2;
};
var getData11 = function (val) {
    return val;
};
var getData22 = function (val) {
    return val;
};
var User = /** @class */ (function () {
    function User(_a) {
        var userName = _a.userName, pwd = _a.pwd;
        this.userName = userName;
        this.pwd = pwd;
    }
    return User;
}());
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    return MysqlDb;
}());
var user = new User({
    userName: "张三",
    pwd: "123456"
});
var Db = new MysqlDb();
// Db.add(user);
// 命名空间
var A;
(function (A) {
    function getName(params) {
        return "我是A空间的获取名称方法，" + params;
    }
    A.getName = getName;
})(A || (A = {}));
var B;
(function (B) {
    function getName(params) {
        return "我是B空间的获取名称方法，" + params;
    }
    B.getName = getName;
})(B || (B = {}));
var a_name = A.getName("aaaa");
var b_name = B.getName("bbbb");
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
function logClass(params) {
    console.log(params, "sss"); // 传入的参数 type
    return function (class_) {
        console.log(class_, "类型"); // 装饰的类
        // 返回一个增强的类
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.url = "new url";
                return _this;
            }
            class_1.prototype.getUrl = function () {
                return this.url;
            };
            return class_1;
        }(class_));
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
function getProps(type) {
    return function (proto, attr) {
        console.log(proto, attr, "xxx");
        proto[attr] = "new Url";
    };
}
var PropClass = /** @class */ (function () {
    function PropClass(url) {
        // public url: string | undefined;
        // this.url = url;
    }
    PropClass.prototype.getUrl = function () {
        // return this.url;
    };
    return PropClass;
}());
var u1 = new PropClass("old url");
console.log(u1.getUrl());
