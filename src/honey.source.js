/*
 * Honey 是基于 headjs(headjs.com) 的加载工具，目前应用于hunantv.com旗下大部分项目
 *   
 * version 2.1.0
 *
 * Lian Hsueh 
 * 
 * Changelog
 *  直接引入无修改版headjs，便于与headjs最新版同步
 *  添加honey.config方法 2014/01/07 Lian Hsueh
 *
 * */

(function(w, doc, undefined) {
    
    var H = function() { 
        this.version = '2.1.0'
    }
    
    var has_debug_hash = w.location.hash.match(/\bdebug\b/)


    H.go = function(_mods, _fn) {
        var 
        mods = _mods.split(','),
        fn = _fn || null,
        scripts = []
        
        if ((has_debug_hash || DEV) && !w.console) {
            mods.splice(0, 0, 'lib:debug')
        }
        
        while (mods.length)
            scripts.push(labelScript(mods.shift()))
        
        fn && scripts.push(fn)
        head.js.apply(w, scripts)
        return H
    } 

    H.ready = head.ready 
    H.load = head.load 

    H.config = function(_configs, _fun) {
        // config options
        // PROJECT, VERSION, DEV, ROOT, PUBROOT, CSS, IMG, COMBO, COMBOURL 
        
        if (H.isString(_configs) && H.isString(_fun)) {
            w[_configs] = _fun
            return H
        }

        /*
         * 直接传入配置文件URL
         *
        if (H.isString(_configs) && /^http\:\/\/(.+)hunantv(.+)\.js/.test(_configs) ) {
            head.js.call(w, _configs, _fun)
            return H
        }
        */
        
        if (_fun === undefined && !H.isString(_configs)) {
            for(var key in _configs) {
                w[key] = _configs[key]
            } 
            return H
        }

    }

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
        m = name.split(is_pub ? ':' : '_')

        if (m[0] === 'package') {
            window.package_name = m[1] 
        }
        
        //var path = m[0] +'/'+ m[1] + ((DEV && !is_pub) ? '.source' : '') +'.js'
        var path = m[0] +'/'+ m[1] + (DEV ? '.source' : '') +'.js'

        path = root +'/'+ path +'?v'+ VERSION
        path = path.replace(/([^:])\/\//g, '$1/')

        script[name] = path

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

    H.ie = (function(){
 
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i')

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );

        return v > 4 ? v : undef

    }())
    
    //判断_a是否在数组_b中
    //如果在，返回_a在_b中对应的下标
    H.inArray = function(_a, _b) {
        for (var c = 0; c < _b.length; c++) { 
            if (_b[c] == _a) 
                return c
        }
        return -1
    }

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

    H.delegate = function(_rules) {
        return function(_e) {
            var 
            e = _e || window.event,
            target = $( e.target || e.srcElement )

            for ( var selector in _rules )
                if ( target.is( selector ) ) 
                    return _rules[ selector ].apply( target, $.makeArray( arguments ) )
        }
    }


    // default debug
    H.debug = 
        w.console
        ? console.log 
        : function() {} 
        
    
    //if (DEV && !w.console) {
    //     
    //}

    w.H = w.Honey = w.honey = w.HN = H
})(window, document)
