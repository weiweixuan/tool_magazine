## diff 算法 整体思路

### 首先 vue 和 react 等框架采用的是 虚拟 dom 来保存真实 dom 的快照，这样在后序数据变动的时候可以直接拿到变更的部分内容，再精准渲染真实 dom

1. 类组件和函数组件写的内容，会被 react.createElement 转化成 虚拟 dom，为一颗 js dom 树对象，保存了 type ，属性 ， children 字段

2. 当页面变动重新渲染前，会对比两颗 新旧 vdom 树，把差异性提交到 patches 的补丁包内 ，然后根据补丁包来修改真实 dom 数据
