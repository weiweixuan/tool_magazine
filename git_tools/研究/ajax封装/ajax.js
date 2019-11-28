function ajax({ url, data, type } = {}) {
  return new Promise((resolve, reject) => {
    // 创建一个异步对象
    let xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const { code, msg, data } = xhr.responseText
        if (!code) {
          resolve(data)
        } else {
          reject(msg)
        }
      }
    }
    // 判断请求类型
    if (type.toUpperCase() === 'GET') {
      let param = getParam(data)
      if (!!param) {
        url = url += '?' + param
      }
      xhr.open(type, url, true)
      xhr.send(null)
    } else {
      xhr.open(type, url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(data)
    }
  })
}
function getParam(data) {
  var arr = []
  for (var prop in data) {
    arr.push(prop + '=' + data[prop])
  }
  return arr.join('&')
}
