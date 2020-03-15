"use strict";
function myLog(obj) {
    return "\u6211\u7684\u540D\u5B57\u53EB" + obj.name + ",\u6211\u4ECA\u5E74" + obj.age + "\u5C81\u4E86";
}
// 调用：
myLog({ name: 'weiwei', age: 12, skil: 'study', sleep: '8h' });
// 如何绕开定义的参数接口====>类型断言：
myLog({ a: '1', b: 1 });
myLog({ a: '1', b: 1 });
// 数组有ReadonlyArray<T>类型，表示不可修改数组
var arrs = [1, 2, 3, 4]; //第一种方式定义数组
var arrs2 = [5, 6, 7, 8]; //泛型定义数组
var s = arrs;
// s.push(1) //push失败
arrs.push(2);
