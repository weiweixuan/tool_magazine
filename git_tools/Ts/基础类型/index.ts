import axios from "axios";
// 布尔类型
let bool: boolean;
bool = true;
console.log(bool, "bool");

// 数字类型
let num: number;
num = 12;
console.log(num, "num");

// 字符串类型
let str: string;
str = "hello";
console.log(str, "str");

// 数组类型
// 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
let arr: number[] = [];
arr.push(1);
console.log(arr);

// 第二种方式是使用数组泛型，Array<元素类型>：
let arr2: Array<number> = [];
arr2.push(2);
console.log(arr2);

// 元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let yz: [number, string];
yz = [1, "a"];
// yz = ['a',1] 飘红
console.log(yz[0]);
console.log(yz[1]);

// 联合类型
let lianhe: string | number;
lianhe = "222";
lianhe = 11;
// lianhe = true; //飘红
