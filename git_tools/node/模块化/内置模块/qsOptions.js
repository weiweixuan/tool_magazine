const qs = require('querystring')
let search = 'name=ww&pwd=123456&title=xxx'
// 查询字符串 : string => obj
let obj = qs.parse(search, '&', '=')
let obj2 = qs.decode(search)
// console.log(obj, obj2, "obj");
// 查询字符串 :  obj => string
let s = qs.stringify(obj, '-', '/')
let s2 = qs.encode(obj2, '-', '/')
// console.log(s, s2, "sss");

// 编码和解码
let escape = qs.escape(search)
console.log(escape, 'escape')

let unescape = qs.unescape(escape)
console.log(unescape, 'unescape')
