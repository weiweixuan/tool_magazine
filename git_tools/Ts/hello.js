var str = 'hello,penny';
console.log(str);
function erdan(params) {
    return params.join('');
}
erdan([1, 2, 3]);
var fun = function (x, y) {
    return x + y;
};
var res = fun(1, 2);
var mySum = function (x, y) {
    return x + y;
};
function reload(val) {
    if (val.length > 0) {
        return val.length;
    }
    else {
        return val;
    }
}
