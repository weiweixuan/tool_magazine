function getAttr(ele, attr) {
            return parseInt(getComputedStyle(ele, null)[attr]);
        }
        let kg = true;
        function animetes(ele, json, fn) {
            if(kg){
                clearInterval(ele.timer);
                ele.timer = setInterval(() => {
                    let ons = true;
                    for (let attr in json) {
                        if (attr == 'opacity') {
                            let current = getAttr(ele, attr) * 100;
                            let target = json[attr] * 100;
                            if (current == target) {
                                ele.style[attr] = target + 'px';
                            }else{
                            let step = (target - current) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            current = current + step;
                            ele.style[attr] = current / 100;
                            }
                        }else if(attr == 'zIndex'){
                            ele.style[attr]=json[attr];
                        }else{
                            // 宽高
                            let current = getAttr(ele, attr);
                            let target = json[attr];
                            let step = (target - current) / 10;
                            step = step > 0 ? Math.ceil(step) : Math.floor(step);
                            current += step;
                            ele.style[attr] = current + 'px';
                            if (current == target) {
                                ele.style[attr] = target + 'px';
                                ons = false;
                            }
                        }
    
                    }
                    kg=false;
                    if (!ons) {
                        clearInterval(ele.timer);
                        ele.timer = null;
                        kg=true;
                        if (fn) {
                            fn();
                        }
                    }
                }, 20);
            }
        }