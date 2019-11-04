// 定义一个方法，实现一个参数接口
interface Person {
  name?: string
  age?: number
  skil?: string //可选属性
  readonly eat?: string //只读属性，不可修改，
  // 任意类型
  [propName: string]: any
}
function myLog(obj: Person): string {
  return `我的名字叫${obj.name},我今年${obj.age}岁了`
}
// 调用：
myLog({ name: 'weiwei', age: 12, skil: 'study', sleep: '8h' })

// 如何绕开定义的参数接口====>类型断言：
myLog({ a: '1', b: 1 } as Person)
myLog(<Person>{ a: '1', b: 1 })

// 数组有ReadonlyArray<T>类型，表示不可修改数组
let arrs: number[] = [1, 2, 3, 4] //第一种方式定义数组
let arrs2: Array<number> = [5, 6, 7, 8] //泛型定义数组

let s: ReadonlyArray<number> = arrs
// s.push(1) //push失败
arrs.push(2)
