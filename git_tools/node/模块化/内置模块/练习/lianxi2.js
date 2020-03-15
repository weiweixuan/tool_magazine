const fs = require("fs");
// 在我wwwroot文件夹下，找到所有的文件，并把他放到一个数组里

let fileOrDir = path =>
  new Promise((resolve, reject) => {
    fs.stat(path, (err, data) => {
      if (err) {
        console.log(err, "err");
        reject();
      }
      return resolve(data.isDirectory());
    });
  });

function doSomeWorks(path) {
  fs.readdir(path, async (err, data) => {
    if (err) {
      console.log("读文件错误");
      return;
    }
    console.log(data, "data");
    let dirArr = [];
    // for 循环版本
    // for (let i = 0; i < data.length; i++) {
    //   let flag = await fileOrDir(`${path}/${data[i]}`)
    //   console.log(flag, 'flag')
    //   if (flag) {
    //     dirArr.push(data[i])
    //   }
    // }
    // console.log(dirArr, 'ddd')

    // promiseAll版本
    let Allres = await Promise.all(
      data.map(item => fileOrDir(`${path}/${item}`))
    );
    console.log(Allres, "xxx");
    Allres.forEach((child, key) => child && dirArr.push(data[key]));
    console.log(dirArr, "dirArr");
  });
}

doSomeWorks("./wwwroot");
