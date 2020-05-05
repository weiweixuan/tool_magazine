# immutable 数据结构：

https://juejin.im/post/5ac437436fb9a028c97a437c

---

# 推荐使用 immer

[参考文章](https://segmentfault.com/a/1190000017270785)

- 基础

  ```
  默认使用方法,传递两个参数，第一个为数据源，第二个为一个函数，第一个参数为数据源的草稿状态，修改不会影响源数据。*返回值是新的对象*
   produce(value,draft=>{
       draft.xxx = xxx;
   });
   第二种使用方法：传递一个函数，参数是元数据的草稿。 *返回值是一个函数，这个函数的第一个参数是源数据。*
   produce(draft=>{
       draft.xxx = xxx;
   })
   第二种方法一般结合setState或者useState使用，返回的函数作为合setState或者useState的函数参数；

   hooks 写法
   setInfo(
          produce(darft => {
            darft.name += "xxx";
          })
        );

   setState写法
   this.setState(
          produce(darft => {
            darft.name += "xxx";
          })
        );

  ```

- immer 的 produce 的拓展用法
  在开始正式探索之前，我们先来看下 produce 第 2 种使用方式的拓展用法:

  ```
  let obj = {};

      let producer = produce((draft, arg) => {
        obj === arg; // true
      });
      let nextState = producer(currentState, obj);
      produce子传递一个函数参数时他返回的是一个函数，切记！！！
      第二个参数可以传递引用到produce的第二个参数(这里是arg);
  ```


      所以可以优化reducer ：
      const reducer = produce((draft, action) => {
        switch (action.type) {
          case 'ADD_AGE':
            draft.members[0].age++;
        }
      })

      ```

- 实战

```
 结合hooks 和 类组件 使用

import React, { useState } from "react";
import produce from "immer";

const defaultValue = [
  { name: "魏巍", age: "11" },
  { name: "魏巍2", age: "112" },
  { name: "魏巍3", age: "113" },
  { name: "魏巍4", age: "114" },
  { name: "魏巍5", age: "115" }
];
export default () => {
  const [data, setData] = useState(defaultValue);
  const [info, setInfo] = useState({ name: "weiwei" });
  console.log(produce, "xxx");

  let producer = produce((temp, current) => {
    console.log(info === current, "???");
    temp.name += "卧槽";
  });
  return (
    <div>
      <h2>{info.name}</h2>
      <button
        onClick={() => {
          setInfo(
            producer(info,info)
          );
        }}
      >
        更新
      </button>
      <ul>
        {data.map(c => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          setData(
            produce(temp => {
              temp.push({ name: Math.random().toString(16) });
            })
          );
        }}
      >
        添加
      </button>
    </div>
  );
};

// export default class A extends React.PureComponent {
//   state = {
//     data: defaultValue
//   };
//   render() {
//     const { data } = this.state;
//     return (
//       <div>
//         <ul>
//           {data.map(c => (
//             <li key={c.name}>{c.name}</li>
//           ))}
//         </ul>
//         <button
//           onClick={() => {
//             // setData(data.concat({name:Math.random().toString(16)}))
//             this.setState(
//               produce(temp => {
//                 temp.data.push({ name: Math.random().toString(16) });
//               })
//             );
//           }}
//         >
//           添加
//         </button>
//       </div>
//     );
//   }
// }

```
