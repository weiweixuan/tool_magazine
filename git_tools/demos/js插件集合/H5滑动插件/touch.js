var TouchTool = function(param) {
    var self = this;
    this.dh = document.documentElement.clientHeight;
    this.direction = param.direction || 'vertical';
    this.device = /android|iphone|ipad|ipod|webos|iemobile|opear mini|linux/i.test(navigator.userAgent.toLowerCase());
    this.sx = this.sy = this.ex = this.ey = this.mx = this.my = this.speedx = this.speedy = this.st = this.et = 0;
    this.obj = param.obj;
    this.len = this.obj.length;
    this.startEvtName = this.device ? "touchstart" : "mousedown";
    this.moveEvtName = this.device ? "touchmove" : "mousemove";
    this.endEvtName = this.device ? "touchend" : "mouseup";
    console.log(this.obj)
    this.touchStart = function(e) {
        var e = e || event;
        self.st = new Date().getTime();
        self.sx = self.device ? e.touches[0].clientX : e.clientX;
        self.sy = self.device ? e.touches[0].clientY : e.clientY;

        self.obj.addEventListener(self.moveEvtName, self.touchMove);
        self.obj.addEventListener(self.endEvtName, self.touchEnd);
    }
    this.touchMove = function(e) {
        var e = e || event;
        self.ex = self.device ? e.touches[0].clientX : e.clientX;
        self.ey = self.device ? e.touches[0].clientY : e.clientY;
    }
    this.touchEnd = function(e) {
        var e = e || event;
        self.et = new Date().getTime();
        self.obj.removeEventListener(self.moveEvtName, self.touchMove);
        self.obj.removeEventListener(self.endEvtName, self.touchEnd);

        self.ex = self.ex;
        self.ey = self.ey;

        self.mx = self.ex - self.sx;
        self.my = self.ey - self.sy;
        self.speedx = Math.abs(self.mx / (self.et - self.st));
        self.speedy = Math.abs(self.my / (self.et - self.st));

        if(self.direction == 'horizontal') {
            if((self.speedx > 1 || (self.speedx > 0.5 && Math.abs(self.mx) > 250)) && self.mx > 0) {
                if(typeof param.slideRight != 'undefined') {
                    param.slideRight();
                }
            };
            if((self.speedx > 1 || (self.speedx > 0.5 && Math.abs(self.mx) > 250)) && self.mx < 0) {
                if(typeof param.slideLeft != 'undefined') {
                    param.slideLeft();
                }
            };
        }

        if(self.direction == 'vertical') {
            if((self.speedy > 1 || (self.speedy > 0.5 && Math.abs(self.my) > 300)) && self.my > 0) {
                if(typeof param.slideDown != 'undefined') {
                    param.slideDown();
                }
            };
            if((self.speedy > 1 || (self.speedy > 0.5 && Math.abs(self.my) > 300)) && self.my < 0) {
                if(typeof param.slideUp != 'undefined') {
                    param.slideUp();
                }
            }
        }
    }

    this.obj.addEventListener(this.startEvtName, this.touchStart);
}

export default TouchTool;