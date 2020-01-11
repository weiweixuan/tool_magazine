# 导出表格

- 导出 exel 表格，后端可以直接处理，但是我们项目里是掉接口后后端返回个 blob 格式的数据类型

  - Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是 JavaScript 原生格式的数据。
    > File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
  - 首先我们需要解析这个 blob 格式的数据，我们用 h5 的 FileReader 这个类：

    > HTML5 的 FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

  下面代码实现：

  ```javascript
  // 首先我们创建一个 filereader 实例
  var reader = new FileReader();
  //把blob数据传递给reader
  reader.readAsDataURL(blob);
  // 处理load事件。该事件在读取操作完成时触发。
  reader.onload = e => {
    // e.target.result 为处理后的base64格式的数据
    // 我们创建一个a标签
    const a = document.createElement("a");
    // 添加下载的文件名字
    a.download = name;
    // 添加下载的数据地址
    a.href = e.target.result;
    // 添加到页面中，调用点击事件，再移除该dom
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  ```
