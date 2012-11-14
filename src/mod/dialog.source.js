//2011 ...go go go!
//
// fixed and absolute
// 大小 OK 
// loading OK
// 设置不同ID后可打开多个 OK
// 多位置 center, rightTop, rightBottom, 指定值[top, right, bottom, left], 指定obj OK
// IE6 position fixed OK
// ovarlay 可设置透明度 OK
// overlay 可点击关闭 OK
// need bgiframe OK
// find 方法 OK
// init open OK
// destroy OK
// close callback OK
// 什么时候destroy？通过 reInit 控制 OK
// reSize 还是有些问题 OK
// 取消reSize方法，setContent第二个参数指定 OK
// resize时 重新设定弹层位置和背景 OK
// 更换HTML模版 OK
// append 到指定BOX OK
// 重复打开时要重新设计定位

HN.dialog = function($settings) {

    var 
    self = this,
    settings = self.settings = $.extend({
        id: 'honey-dialog',
        width: 'auto',
        height: 'auto',
        position: 'center',
        fixed: true,
        opacity: 0,
        needBG: true,
        disableBgClick: false,
        close: false,
        html: false,
        appendTo: 'body',
        content: ''
    }, $settings);

    self.init = function() {

        self.box = $('#'+ self.settings.id).length ?
            $('#'+ self.settings.id) : renderHtml();
        self.conBox = self.box.find('.honey-dialog-conBox');
        self.bg = $('#honey-dialog-overlay');
        self.bgiframe = $('#honey-dialog-bgframe');
        self.ie6 = HN.ie == 6;
        //self.loadingimage = CSSURL +'ui/mangoq/2010v1/images/ico/loading3.gif';
        self.inited = true;
        self.reInit = false;
        self.setContent(settings.content);
        
        //绑定事件
        self.box.on('click', '.honey-dialog-close', function() {
            self.close();
            return false;
        });
        //self.box.click($.delegate({
        //    '.honey-dialog-close': function() {
        //        self.close();
        //        return false;
        //    }                     
        //}));
    
    };
    
    function renderHtml() {
        
        var html = settings.html || [
            '<div class="dialog" id="'+ settings.id +'">',
            '<div class="honey-dialog-conBox">',
            '</div>',
            '</div>'
        ].join(''),
        overlay = [
            '<iframe id="honey-dialog-bgframe" framebroder=0 />',
            '<div id="honey-dialog-overlay"></div>'
        ].join('');
        $(settings.appendTo).append(html);
        settings.needBG && $('body').append(overlay);
         
        return $('#'+ settings.id);
    }
    
};

HN.dialog.prototype = {
    
    open: function() {
        var self = this;
        if (self.inited) {
            self.box.show();
            self.setPosition(self.settings.width, self.settings.height);
            self.bg.show();
            self.bgiframe.show();
        } else self.init(); 
    },

    find: function($selector) {
        var self = this; 
        return self.conBox.find($selector)
    },
    
    setSize: function($w, $h) {
        var 
        self = this,
        box = self.box,
        conBox = self.conBox,
        h = $h,
        w = $w;
        //h = $h == 'auto' ? (+conBox.height() + 10 + 24) : $h;
        //w = $w == 'auto' ? (+conBox.width() + 10 + 24) : $w;
        
        box.css({
            width: +w,
            height: +h
        });

        box.find('.w-top-m, .w-main-m, .w-buttom-m').width(w - 24);
        box.find('.w-main-l, .w-main-m, .w-main-r').height(h - 24);

        self.setPosition(w, h);
    },

    showLoading: function() {
        var 
        self = this,
        loading = $('<img />', {src: self.loadingimage, height: 55, width: 55, style: "margin-left: 5px"});
        self.setContent(loading, [85, 85]);
    },
    
    setContent: function($c, $size) {
        var 
        self = this,
        w = $size ? $size[0] : self.settings.width,
        h = $size ? $size[1] : self.settings.height;

        if (typeof $c === 'function') { 
            self.showLoading();
            $c(self);
        } else {
            self.conBox.html($c);
            self.setSize(w, h);
        }

    },

    setPosition: function($w, $h) {
        var 
        self = this,
        p = self.settings.position,
        w = $(window),
        fixed = (!self.ie6 && self.settings.fixed),
        winW = w.width(),
        winH = w.height(),
        winscrollTop = w.scrollTop(),
        pos = {
            position: fixed ? 'fixed' : 'absolute',
            zIndex: 999
        },
        didScroll = false;

        $h = $h == 'auto' ? (+self.conBox.height() + 10 + 24) : $h;
        $w = $w == 'auto' ? (+self.conBox.width() + 10 + 24) : $w;

        if (p == 'center') {
            pos.left = (winW - $w)/2;
            pos.top = (winH - $h)/3;
            !fixed && (pos.top += winscrollTop);
        } else if (p == 'rightTop') {
            //pos.left = (winW - $w - 10);
            pos.right = 10;
            pos.top = 10;
            !fixed && (pos.top += winscrollTop);
        } else if (p == 'rightBottom') {
            pos.bottom = 10;
            pos.right = 10;
            !fixed && (pos.top += winscrollTop);
        } else if (typeof p == 'object') {
            if (p.length == 4) {
                pos.top = p[0];
                pos.right = p[1];
                pos.bottom = p[2];
                pos.left = p[3];
            } else {
                var 
                target = $(p),
                offset = target.position(),
                targetH = target.height(); 

                pos.left = offset.left;
                pos.top = offset.top + targetH + 5;
                pos.position = 'absolute';
                self.settings.fixed = fixed = false;
            }
        } else return;

        //
        if (pos.top === 'auto') {
            pos.top = winH - pos.bottom - $h;
        }

        self.box.css(pos);
        self.settings.needBG && self.setIframe(winW, winH, winscrollTop);
        
        //绑定滚动
        (self.ie6 && self.settings.fixed && !self.box.scrollbinded) && 
        w.scroll(function() {
            didScroll = true;
            self.box.scrollbinded = true;
        }), setInterval(function() {
            if (didScroll) {
                self.resetPos.call(self, w, (pos.top-winscrollTop));
                didScroll = false; 
            }
        }, 250);

        //绑定改变窗口大小
        !self.box.resizebinded && w.resize(function() {
            self.box.resizebinded = true;
            self.setPosition.call(self, self.box.width(), self.box.height());        
        });
     
    },
        
    resetPos: function($w, $t) {
        var
        self = this,
        originTop = $t,
        winscrollTop = $w.scrollTop();
        //
        self.box.stop().animate({
            top: +(originTop + winscrollTop)
        }, 500);
        
    },

    setIframe: function($docw, $doch, $scrolltop) {
        var 
        self = this,
        doc = window.document,
        scrollH = Math.max($doch, doc.compatMode === 'CSS1Compat' ?
                doc.documentElement.scrollHeight :
                doc.body.scrollHeight),
        css = {
            position: self.ie6 ? 'absolute' : 'fixed',
            left: 0,
            top: 0,
            height: scrollH,
            width: $docw,
            zIndex: 998,
            opacity: self.settings.opacity,
            backgroundColor: "#000"
        };
        
        self.bg.css(css);
        self.bgiframe.css(css);
        
        if (!self.settings.disableBgClick) {
            self.bg.unbind('click').click(function() {
                self.close.call(self);      
            });
        }
        
    },

    close: function() {
        var self = this;
        if (self.reInit) {
            self.destroy();     
        } else {
            self.box.hide();       
            self.bg.hide();       
            self.bgiframe.hide();       
            self.settings.close && self.settings.close.call(self, self);

        }
    },

    destroy: function() {
        var self = this;
        self.box.remove();       
        self.bg.remove();       
        self.bgiframe.remove();         
        self.inited = false;
    }

};

//加载所需图片
/*
setTimeout(function() {
    var imgs = [
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_0.png',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_1.jpg',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_2.jpg',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_3.png',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_4.png',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_5.png',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_6.png',
        CSSURL +'ui/mangoq/2010v1/images/bg/f_a_7.png'
    ];

    while(imgs.length)
        new Image().src = imgs.shift();
        
}, 1000);
*/
