honey.def('lib:jquery', function(H) {


    H.slide = function($options) {

        var options = {
            slideId: 'hn-slide', //slide唯一标识ID
            autoPlay: false,
            itemNode: 'div',    //循环个体nodeName
            repeat: true,       //是否循环
            direction: 'X',     //方向 ，X轴和Y轴
            times: 300,         //动画时间
            scrollItems: 1,     //滚动个数
            showItems: 1,
            click: false,
            before: false,
            after: false
        };
        
        if (H.isString($options)) {
            options.slideId = $options;   
        } else if (typeof $options == 'object') {
            $.extend(options, $options);   
        }

        var 
        s = $('#'+ options.slideId),
        con = s.children('div.hn-slide-con'),
        box = con.children('.hn-slide-box'),
        prev = s.find('.hn-slide-prev'),
        next = s.find('.hn-slide-next'),
        items = box.children(options.itemNode),
        itemLen = items.length,
        worh = options.direction == 'X' ? 'Width' : 'Height',
        distance,
        inAnim = false,
        max = 0,
        t = null;

        //!s.length && HN.debug('没有找到id为"'+ options.slideId +'"的东东');

        distance = options[worh] || $(items[0])['outer'+worh]();
        max = distance * itemLen;

        //定义滚动个体的父容器宽度
        //var fixpx=0;
        //if(ie6){ fixpx=10;}
        box[worh.toLowerCase()](max);

        //点击个体的整体 
        options.click && items.click(options.click);
        //自动
        options.autoPlay && (t = setTimeout(function() {
            if (inAnim) return;
            options.repeat = true;
            scroll(true);         
        }, options.autoPlay));
        
        if (next.length) { 
            next.click(function() {
                scroll(true);    
                return false;
            }); 
        } 

        if (prev.length) { 
            prev.click(function() {
                scroll(false);    
                return false;
            }); 
        } 
        
        function scroll($isNext) {
            var 
            Pos = options.direction == 'X' ? 'Left' : 'Top',
            pos = Pos.toLowerCase(),
            key = 'scroll' + Pos,
            old = con[0][key],
            attr = {},
            newpos,
            elem;

            if (typeof $isNext === 'number') {
                newpos = $isNext * distance;
            } else {
                if ($isNext) {
                    newpos = 
                        (old + distance * options.showItems) >= max ? 
                        (options.repeat ? 0 : max) :
                        (old + distance);
                } else {
                    newpos = 
                        (old - distance) < 0 ?
                        (options.repeat ? max : 0) : 
                        (old - distance);
                }
            }

            attr[key] = newpos;
            elem = $(items[(newpos/distance) > (itemLen-1) ? (itemLen-1) : (newpos/distance)]);

            if (options.before) {
                options.before(elem, function() {
                    anim.call(con, attr, elem);
                });
            } else 
                anim.call(con, attr, elem)
            
        }

        function anim($attr, elem) {
            inAnim = true;
            con.animate(
                $attr, 
                options.times, 
                function(){
                    inAnim = false;
                    options.after && options.after.call(elem, elem);
                    if (options.autoPlay) {
                        clearTimeout(t);
                        t = setTimeout(function() {
                            if (inAnim) return;
                            scroll(true);     
                        }, options.autoPlay);
                    }
            });
        }

        return {
            goTo: scroll  
        };

    }; 
 
}); 