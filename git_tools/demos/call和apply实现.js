// call实现
Function.prototype.callFun = function(obj, ...args) {
  if (!obj) {
    obj = typeof window === 'undefined' ? global : window
  }
  obj.func = this
  let res = obj.func(...args)
  delete obj.func
  return res
}
// apply实现
Function.prototype.applyFun = function(obj, args) {
  if (!obj) {
    obj = typeof window === 'undefined' ? global : window
  }
  obj.func = this
  let res = obj.func(...args)
  delete obj.func
  return res
}

// bind实现
Function.prototype.bindFun = function(obj, ...args) {
  let _this = this
  if (!obj) {
    obj = typeof window === 'undefined' ? global : window
  }
  return function() {
    _this.call(obj, ...args, ...arguments)
  }
}
var name = 'aaa'
var obj = { name: 'bbb' }
function a(age, job) {
  console.log(this, this.name, '我今年' + age + '岁', '我的工作是' + job)
}

let funs = a.bindFun(obj, 20)
funs('敲代码')
