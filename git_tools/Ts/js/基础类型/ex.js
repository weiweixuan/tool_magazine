"use strict";
// 枚举类型, 模拟接口返回的数据 ， 并处理
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Product;
(function (Product) {
    Product[Product["\u5F85\u51FA\u5E93"] = 1] = "\u5F85\u51FA\u5E93";
    Product[Product["\u53D1\u8D27\u4E2D"] = 2] = "\u53D1\u8D27\u4E2D";
    Product[Product["\u5F85\u7B7E\u6536"] = 3] = "\u5F85\u7B7E\u6536";
    Product[Product["\u5DF2\u5B8C\u6210"] = 9] = "\u5DF2\u5B8C\u6210";
})(Product || (Product = {}));
// 继承类型
// type oldList = list & { state: number };
// type newList = list & { state: string };
var orderStatus = Array.from({ length: 5 }, function () { return ({
    name: Math.random().toString(10),
    state: [1, 2, 3, 9][Math.floor(Math.random() * 4)]
}); });
/**
 * 格式化list
 * @param arr
 */
function formatData(data) {
    return data.map(function (item) { return (__assign(__assign({}, item), { state: Product[item.state] })); });
}
var res_ = formatData(orderStatus);
var obj = { name: "222" };
var adds = function (v) {
    return v + 1;
};
var adds2 = function (f) {
    console.log("我执行了");
    return f;
};
// 高阶函数
function addOne(params) {
    return params + 1;
}
var hoc = adds2(addOne);
console.log(hoc(10));
function add10(v) {
    return v + 10;
}
function cheng5(v) {
    return v * 5;
}
var handleHocFn = function (f1, f2) {
    return function (name, val1, val2) {
        if (val1 === void 0) { val1 = 1; }
        if (val2 === void 0) { val2 = 1; }
        var res = f1(val1) + f2(val2);
        return name + "\u8C03\u7528\u5566\uFF0C\u7ED3\u679C\u662F" + res;
    };
};
var r = handleHocFn(add10, cheng5);
console.log(r("狗子", 10, 10));
function ajax(_a) {
    var _b = _a === void 0 ? {
        type: "post",
        url: "jjj",
        data: "name=ha",
        success: function (val) {
            console.log("success", val);
        }
    } : _a, type = _b.type, url = _b.url, data = _b.data, success = _b.success;
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
// 摘取了新的接口pick，从ex1中取了obj对象作为新接口
var arr1 = { obj: { name: "xx", age: 12 } };
