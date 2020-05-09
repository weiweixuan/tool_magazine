### 1. ["1", "2", "3"].map(parseInt)结果是什么？

```
map方法指定一个回调函数，重新创建一个由回调函数返回值组成的新数组。该方法的原型是：

    var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // Return element for new_array
    }[, thisArg])
    map接受2个参数，一个是回调函数callback，一个是回调函数的this值。

    解释如下：

    callback：生成新数组元素的函数，有三个参数
    currentValue：callbac当前正在处理的元素
    index：callback当前正在处理的当前元素的索引
    array：map方法调用的数组本身
    thisArg：执行callback函数时值被当做this
    Number.parseInt接受两个参数，原型Number.parseInt(string[, radix])，一个是要解析的值，一般是字符串，如果不是的话，使用toString方法将它转化为字符串。参数radix，是一个介于2到36之间的整数，如果省略该值或者为0，则按照10进制来解析，也就是说默认值是10，如果是“0x”或者“0X”开头，则以16进制为基数。如果小于2或者大于36，则parseInt返回NaN。

    也就是说[].map(parseInt)这种写法根本就是想当然的，本题相当于下面的三句：

    parseInt('1', 0);parseInt('2', 1);parseInt('3', 2);

    这三句只有第一句会把第二个参数0默认为10，剩下两句都不满足radix参数介于2到36之间，所有返回[1, NaN, NaN]。另外，如果想得到正确的结果，应该这样写["1", "2", "3"].map(i => parseInt(i))。
```

### 2. 运行[typeof null, null instanceof Object]这个表达式结果是什么？

```
  这个主要考察typeof，instanceof两个操作符，前者是返回一个字符串表示未经计算的操作数的类型，后者是判断null的原型链中是否出现了Object的构造函数的property。

这两个操作符用来判断类型，前者常用来判断字面量，后者用来判断对象的类型，但是两个都有缺陷，详见另一篇文章《javascript中判断数据类型》

但是null是一个比较特殊的值，type of null返回的是“objec”，这是因为JavaScript最初实现中，值是由一个表示类型的标签和实际数值表示的。对象的类型标签是0，由于null代表是空指针（大多数平台下值为0x00），因此null的类型标签是0，typeof null也就返回“object”。

null是所有原型链的最顶端，null instanceof Object返回false，假设null这个值有构造函数Null，obj instanceof Null才会返回true。

所以上面表达式返回["object", false]。
```
