/*
 * 
 * Honey, just a loader, based headjs ( headjs.com )
 * Version 3.0
 * Lian Hsueh from Huantv.com
 * 
 * remove methods:
 *  1. honey.isString
 *  2. honey.delegate
 *  3. honey.ie()
 */

(function(w, doc, undefined) {
    var 
    head = doc.documentElement,
    H = function() { 
        this.version = '3.0';
    };

    // honey global
    var
    handlers = {},     // user functions waiting for events
    scripts = {},
    scriptGroup = {},
    defHandlers = {},
    isAsync = 
        doc.createElement("script").async === true ||
        "MozAppearance" in doc.documentElement.style || 
        window.opera;


    // states
    var PRELOADED = 1,
        PRELOADING = 2,
        LOADING = 3,
        LOADED = 4;

    H.debug = function(msg) {
        var msgbox = document.createElement('div');
        msgbox.innerHTML = msg;
        document.body.appendChild(msgbox);
    }; 
    H.go = function(_m, _fn) {

        var 
        mods = _m.split(','),
        fn = _fn || null,
        l, current,
        group = scriptGroup[_m] || {scripts: []};

        while (l = mods.length) {
            var m = getScript(mods.shift());
            if (current === m.name) {
                continue;
            }
            current = m.name;
            if (!group.state) {
                group.scripts.push(m);
            }        
            load(m, function() {
                var group = scriptGroup[_m];
                group
                ? allLoaded(group.scripts) && one(fn)
                : one(fn);
            });
            (l === 1) && (current = null);
        }
        scriptGroup[_m] = group;
        //if (isAsync) 
        //    while (l = mods.length) {
        //        var m = getScript(mods.shift());
        //        if (current === m.name) {
        //            continue;
        //        }
        //        current = m.name;
        //        (l - 1)
        //            ? load(m)
        //            : load(m, fn), current = null;
        //        
        //    }
        //else asyncLoad(mods, fn)

        return H;
    };
    
    H.ready = function(_mods, _fn) {
        var 
        lastmod = _mods.split(',').pop(),
        lastscript = scripts[lastmod]; 
        
        if (lastscript && lastscript.state == LOADED) {
            one(_fn);
            return H;
        }

        var arr = handlers[lastmod];
        if ( !arr ) { 
            handlers[lastmod] = [_fn]; 
        } else { 
            arr.push(_fn); 
        }
        return H;
    };

    H.def = function(_deps, _method) {
        
        var 
        deps = _deps.split(','),
        fn = function() {
            _method(H);
        }; 
        ready = 1;
        each(deps, function(_m) {
            if (!scripts[_m]) {
                //TODO
                //没有在H.go中引入依赖
            }
            if (scripts[_m] && scripts[_m].state !== LOADED) {
                H.ready(_m, fn);
                ready = 0;
            } 
        });
        ready && fn();
    };
    
    function load(script, callback) {

        if (script.state == LOADED) {
            return callback && callback();
        }

        if (script.state == LOADING) {
            return H.ready(script.name, callback);
        }

        if (script.state == PRELOADING) {
            return script.onpreload.push(function() {
                load(script, callback);
            });
        }

        script.state = LOADING;

        scriptTag(script.src, function() {

            script.state = LOADED;

            // handlers for this script
            each(handlers[script.name], function(_fn) {
                one(_fn);
                handlers[script.name] = [];
            });

            if (callback) { 
                callback(); 
            }

            // everything ready
            //if (allLoaded() && isDomReady) {
            //    each(handlers.ALL, function(fn) {
            //        one(fn);
            //    });
            //}
        });
    }

    function asyncLoad(_mods, _fn) {
        var 
        l = _mods.length,
        m = _mods.shift(),
        exmod = getScript(m);
        if (l > 1) {
            each(_mods, function(_el) {
                preload(getScript(_el));
            });
            load(exmod, function() {
                asyncLoad.call(null, _mods, _fn);
            });
        } else {
            load(exmod, _fn); 
        }
    }

    function preload(_script) {
        var script = _script;
        if (!script.state) {
            script.state = PRELOADING;
            script.onpreload = [];
            scriptTag({ 
                src: script.src,
                type: 'cache'
            }, function() {
                onPreload(_script);
            });
        }
    }

    function onPreload(_script) {
        _script.state = PRELOADED;
        each(_script.onpreload, function(_el) {
            _el.call();
        });
    }

    function getScript(_m) {
        
        var 
        name = H.trim(_m); 
        
        if ( scripts[name] ) {
            return scripts[name];
        }
        var
        is_pub = name.indexOf(':') > 0,
        root = is_pub ? PUBROOT : ROOT,
        m = is_pub 
            ? name.split(':')
            : name.split('_');
        
        var
        path = m[0] +'/'+ m[1] + (DEV ? '.source' : '') +'.js',
        script = {name: name, src: root +'/'+ path +'?v'+ VERSION};
        
        //if ( !$justGiveScript ) {
        scripts[name] = script;
        //}

        return script;
    }

    function scriptTag(src, callback) {

        var s = doc.createElement('script');
        s.type = 'text/' + (src.type || 'javascript');
        s.src = src.src || src;
        s.async = false;

        s.onreadystatechange = s.onload = function() {

            var state = s.readyState;
            if (!callback.done && (!state || /loaded|complete/.test(state))) {
                callback.done = true;
                callback();
            }
        };

        // use body if available. more safe in IE
        (doc.body || head).appendChild(s);
    }

    function each(arr, fn) {
        if (!arr) { return; }

        // arguments special type
        if (typeof arr == 'object') { arr = [].slice.call(arr); }

        // do the job
        for (var i = 0, l = arr.length; i < l; i++) {
            fn.call(arr, arr[i], i);
        }
    }

    function one(_fn) {
        if (!_fn || _fn._done) return;
        _fn();
        _fn._done = 1;
    }

    function allLoaded(_els) {
        var 
        els = _els || scripts,
        loaded = 1;
        for (var name in els) {
            if (els[name].state !== LOADED) {
                loaded = 0;
            }
        }
        return loaded;
    }
    
    //simple css loader
    H.css = function(_url) {

        var f = doc.createElement('link'); 
        f.setAttribute('rel', 'stylesheet');
        f.setAttribute('type', 'text/css');
        f.setAttribute('href', _url);
        (doc.body || head).appendChild(f);

    };

    H.trim = function(_a) {
        return _a.replace( /^\s+|\s+$/g, '' ); 
    };
    
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
        div = document.createElement('div');

        while(
            div.innerHTML = '<!--[if gt IE '+ (++v) +']><i></i><![endif]-->',
            div.getElementsByTagName('i')[0]
        );
        return v>4 ? v : undef;           
    })();
   
    w.H = w.Honey = w.honey = w.HN = H;

})(window, document);
