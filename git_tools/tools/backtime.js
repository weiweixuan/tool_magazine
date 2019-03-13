function backTime(timenumber,ing,end){
    this.autoGoodsRefundTime = timenumber;
    this.flagtime = 0;
    this.ing = ing;
    this.end = end;
    this.timeout ;

}

backTime.prototype = {
    timerback: function () {

        var _this = this;
        var ts = _this.autoGoodsRefundTime - _this.flagtime;

        if (ts >= 0) {
            var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
            var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
            var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
            var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
            
            dd = _this.checkTimeInfo(dd);
            hh = _this.checkTimeInfo(hh);
            mm = _this.checkTimeInfo(mm);
            ss = _this.checkTimeInfo(ss);

            _this.ing(dd,hh,mm,ss)


            _this.flagtime += 1000;

            if( _this.autoGoodsRefundTime - _this.flagtime < 0){
                clearTimeout(_this.timeout);
                _this.end();
            }else{

                _this.timeout =  setTimeout(function () {
                    _this.timerback()
                }, 1000);
            }
        }

    },
    clear:function(){
        clearTimeout(this.timeout);
    },
    checkTimeInfo: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}

function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
  }
module.exports = {
    backTime:backTime,
    getDateTimeStamp:getDateTimeStamp
}