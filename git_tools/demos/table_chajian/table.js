
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Table = factory());
})(this,function(){
    // "use strict"
    function checkDataType_isobj(obj){
       if(Object.prototype.toString.call(obj)!=="[object Object]") {
           throw new Error("入参必须为对象形式");
       }
    }
    return function Table(obj){
        let el = obj.el;
        let col_ = obj.col_;
        let title = obj.title;
        let data = obj.data;
        checkDataType_isobj(obj);
        let father = document.querySelector(el);
        let table = document.createElement("table");
        table.id='Table';
        table.style.width='100%';
        table.style.textAlign='center';
        table.border=1;
        // 创建表头
        let thead = document.createElement("thead");
        let html = '<tr>';
        for(let item of title){
            html +=`
                <td>${item}</td>
            `;
        }
        html+="</tr>";
        thead.innerHTML=html;
        table.appendChild(thead);
        // 创建表主体
        let tbody = document.createElement("tbody");
        data.forEach(function(item){
            let tr = document.createElement("tr");
            let str = '';
            for(let val of col_){
                let res = item[val];
                str += `<td>${res}</td>`;
            }
            console.log(str);
            tr.innerHTML=str;
            tbody.appendChild(tr);
        });


        table.appendChild(tbody);
        father.appendChild(table);
    }
});