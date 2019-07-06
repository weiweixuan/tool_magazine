function deep(params) {
  let res
  if (params !== null && typeof params === 'object') {
    if (Object.prototype.toString.call(params) === '[object Object]') {
      res = {}
    } else if (Object.prototype.toString.call(params) === '[object Array]') {
      res = []
    }
    for (let key in params) {
      if (typeof params === 'object') {
        res[key] = arguments.callee(params[key])
      } else {
        res[key] = params[key]
      }
    }
  } else {
    return params
  }
  return res
}
var obj = {
  a: null,
  arr: [Date.now(), 2, 3, 4, 5, [5, 5, 6, [444, 111]]],
  b: { c: '2', d: '3', e: { f: '4' } }
}
var res = deep(obj)
console.log(res, obj)
