// 布尔类型
var bool;
bool = true;
console.log(bool, 'bool');
// 数字类型
var num;
num = 12;
console.log(num, 'num');
// 字符串类型
var str;
str = 'hello';
console.log(str, 'str');
// 数组类型
// 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
var arr = [];
arr.push(1);
console.log(arr);
// 第二种方式是使用数组泛型，Array<元素类型>：
var arr2 = [];
arr2.push(2);
console.log(arr2);
// 元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
var yz;
yz = [1, 'a'];
// yz = ['a',1] 飘红
console.log(yz[0]);
console.log(yz[1]);
