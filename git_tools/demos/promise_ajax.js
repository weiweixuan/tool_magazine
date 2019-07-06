//    创建异步对象
function createxhr(){
    let xhr;
if(window.XMLHttpRequest){
    return xhr =new XMLHttpRequest();
}else{
  return  xhr = new ActiveXObject("Microsoft.XMLHttp");
}
}

function pro_ajax(method,url){
    return new Promise(function(resolve,reject){
        let xhr =createxhr();
        console.log(method,url);
        xhr.onreadystatechange=function(){
        console.log(1111111);
            if(xhr.readyState==4 && xhr.status==200){
                        console.log("成功啦");
                        resolve(xhr.responseText);
            }
        }
        xhr.open(method,url,true);
        xhr.send();
    });
}
export let ajax = pro_ajax;