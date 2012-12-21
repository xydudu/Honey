/*
 * Honey 是基于 headjs(headjs.com) 的加载工具，目前应用于hunantv.com旗下大部分项目
 *   
 * version 3.1
 *
 * Lian Hsueh 
 * 
 * Changelog
 *  直接引入无修改版headjs，便于与headjs最新版同步
 *  
 *
 * */

(function(w, doc, undefined) {
    
    var H = function() { 
        this.version = '3.0'
    }

    H.go = function(_mods, _fn) {
        var 
        mods = _mods.split(','),
        fn = _fn || null,
        scripts = []
        
        
        while (mods.length)
            scripts.push(labelScript(mods.shift()))
        
        fn && scripts.push(fn)
        head.js.apply(w, scripts)
        return H
    } 

    H.ready = head.ready 

    H.def = function(_deps, _fn) {
        if (arguments.length == 1) {
            _fn = _deps
            _deps = ''
            return _fn(H)
        } 

        var 
        deps = _deps.split(','),
        fn = function() {
            return _fn(H)
        }
        // TODO
        //  def 注册事件如何在依赖模块之后，go 之前fire?
        fn()
        //H.ready(deps[deps.length - 1], fn) 
    }

    H.trim = function(_a) {
        return _a.replace( /^\s+|\s+$/g, '' )
    }

    function labelScript(_mod_name) {
        var 
        name = H.trim(_mod_name),
        is_pub = name.indexOf(':') > 0,
        root = is_pub ? PUBROOT : ROOT,
        script = {},
        m = is_pub 
            ? name.split(':')
            : name.split('_');
        
        var path = m[0] +'/'+ m[1] + ((DEV && !is_pub) ? '.source' : '') +'.js'
        script[name] = root +'/'+ path +'?v'+ VERSION

        return script
    }

    // tools
    //
    // ----------------------------------------------------------
    // If you're not in IE (or IE version is less than 5) then:
    //     ie === undefined
    // If you're in IE (>5) then you can determine which version:
    //     ie === 7; // IE7
    // Thus, to detect IE:
    //     if (ie) {}
    // And to detect the version:
    //     ie === 6 // IE6
    //     ie> 7 // IE8, IE9 ...
    //     ie <9 // Anything less than IE9
    // ----------------------------------------------------------
    // http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/

    H.ie = (function() {
        var
        undef,
        v = 3,
        div = document.createElement('div')

        while(
            div.innerHTML = '<!--[if gt IE '+ (++v) +']><i></i><![endif]-->',
            div.getElementsByTagName('i')[0]
        );
        return v>4 ? v : undef
    })();


    //判断_a是否在数组_b中
    //如果在，返回_a在_b中对应的下标
    H.inArray = function(_a, _b) {
        for (var c = 0; c < _b.length; c++) { 
            if (_b[c] == _a) 
                return c
        }
        return -1
    };

    H.isString = function(_o) {
        return typeof _o === 'string'
    }

    //生成两个数间的随机数
    H.random = function(_min, _max) {
        return (_max - _min) * Math.random() + _min
    }
    
    H.css = function(_url) {
        head.js(_url)
    }

    w.H = w.Honey = w.honey = w.HN = H
})(window, document)
