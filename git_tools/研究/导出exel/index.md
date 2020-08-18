# 导出表格

- 导出 exel 表格，后端可以直接处理，但是我们项目里是掉接口后后端返回个 blob 格式的数据类型

  - Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是 JavaScript 原生格式的数据。
    > File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
  - 首先我们需要解析这个 blob 格式的数据，我们用 h5 的 FileReader 这个类：

    > HTML5 的 FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

  - 注意点： 后端返回的是个二进制数据流，前端拿到数据没法解析，所以请求的时候需要指定 让浏览器解析成 blob 格式 （请求加上 responseTpye : 'blob' ）

  下面代码实现：

  ```javascript
  // 首先我们创建一个 filereader 实例
  var reader = new FileReader();
  //把blob数据传递给reader
  reader.readAsDataURL(blob);
  // 处理load事件。该事件在读取操作完成时触发。
  reader.onload = (e) => {
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

  // 完整案例 导出excel
  // 问题是 后端返回的数据都
  request_({
    method,
    url: action,
    data: formData,
    responseType: "blob", // 限制返回的数据流格式
  }).then((res) => {
    // 做判断 (默认返回带有 application/vnd.ms-excel 的为失败数据，需要导出)
    if (res.type === "application/vnd.ms-excel") {
      const blob = new Blob([res], { type: res.type });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (e) => {
        const a = document.createElement("a");
        a.download = "导入失败原因";
        a.href = e.target.result;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      Message.error("导入数据失败");
    } else {
      const reader = new FileReader();
      reader.readAsText(res, "utf-8"); // 转成 string
      reader.onload = function () {
        try {
          const result = JSON.parse(reader.result);
          if (result.success && result.code === 200) {
            Message.success("导入成功");
          } else {
            Message.error("导入失败");
          }
        } catch (error) {
          Message.error("数据异常,请检查");
        }
      };
    }
  });
  ```
