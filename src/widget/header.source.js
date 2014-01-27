// header
// Lian Hsueh 7.5/2013
// modified: none


honey.def('lib:mustache, tpl:header, plugin:pswencode', function(H) {

    //'use strict'
    
    var 
    script,
    doc = window.document,
    current_url = window.location.href,
    body = doc.body, 
    tpl = H.headerTpl,
    api = 'http://app.i.hunantv.com/api/newuserstatus/?jsoncallback=honey.header.back',
    con,
    top_login_trigger,
    options = {}
    //iframe = (function() {
    //    var iframe = doc.createElement('iframe')
    //    iframe.style.display = 'none'
    //    iframe.id = 'top-login-iframe'
    //    iframe.name = 'top-login-iframe'
    //    body.appendChild(iframe)
    //    return iframe
    //})()

    // funcs
    var
    contains = function(container, maybe) {
        if (!container) return false
        return container.contains ? container.contains(maybe) :
            !!(container.compareDocumentPosition(maybe) & 16);
    },
    removeTag = function() {
        if (!script || !script.parentNode) return
        script.parentNode
            ? script.parentNode.removeChild(script)
            : body.removeChild(script)
        script = null
    },
    bindEvent = function() {
        var 
        box = doc.getElementById('top-login-box'),
        login_trigger = doc.getElementById('top-login-trigger')

        //top-login-trigger


        con.onclick = function(_e) {
            var 
            event = _e || window.event,
            target = event.target || event.srcElement,
            funcs = {
                "top-login-trigger": showLogin,
                "set-home": setHomePage,
                "top-login-button": loginSubmit,
                "top-msg-trigger": showMsgBox,
                "third-login-sina": thirdLogin,
                "third-login-tqq": thirdLogin,
                "third-login-qq": thirdLogin
            }
            return funcs[target.id] && funcs[target.id].call(target)
        }

        window.onclick = function(_e) {
            if (!box) return 
            var 
            event = _e || window.event,
            target = event.target || event.srcElement,
            display = box.style.display
            if (
                !contains(box, target) 
                && !contains(login_trigger, target)) {
                    box.style.display = 'none'
                }
            //return false
        }

        //if (H.placeholder) {

        //    //H.placeholder()      
        //}

        con.onmouseover = function(_e) {
            var 
            event = _e || window.event,
            target = event.target || event.srcElement

            if (target.id === 'top-msg-trigger') {
                showMsgBox.call(target)
            }
            return false
        }

        con.onkeyup = function(_e) {
            var event = _e || window.event
            if (event.keyCode === 13) {
                loginSubmit() 
            }
            return false
        }

        con.onmouseout = function(_e) {
            var 
            event = _e || window.event,
            target = event.target || event.srcElement,
            relTarg = event.relatedTarget || event.fromElement,
            _ = document.getElementById('top-msg-trigger'),
            box = document.getElementById('top-msg-box')

            //console.log(target, relTarg, contains(box, relTarg));

            if (!contains(box, relTarg) && 
                    (contains(box, target) 
                     || target.id === 'top-msg-box')) {
                showMsgBox.call(_)
            }

            //if (target.id === 'top-msg-box') {
            //}
            return false
        }

        //var login_trigger = document.getElementById('top-login-trigger')
        //
        //login_trigger.onmouseover = function(_e) {
        //    showLogin.call(this)
        //    return false
        //}
    },
    bindPlaceHolder = function() {
        //if (H.moduleLoaded('lib:'))
        if (window.jQuery) return false 
        if (H.placeholder) {
            H.placeholder(doc.getElementById('top-login-email'))
            H.placeholder(doc.getElementById('top-login-password'))
        }
    },
    showLogin = function() {
        var 
        box = doc.getElementById('top-login-box'),
        display = box.style.display

        if (display === 'none') {
            (box.innerHTML === '') &&
                (box.innerHTML = tpl.login, bindPlaceHolder())
            box.style.display = 'block'
        } else {
            box.style.display = 'none'
        }
        return false
    },
    loginSubmit = function() {
        var 
        form = doc.getElementById('top-login-form'),
        reg = /^([a-zA-Z0-9\_\.\-])+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi,
        email = doc.getElementById('top-login-email'),
        emailv = email.value,
        pass = doc.getElementById('top-login-password'),
        passv = pass.value,
        encode_pass = doc.getElementById('top-login-encodepass')
        
        if (H.trim(emailv) == '') {
            alert('请输入您的金鹰网帐号')
            email.focus()
            return false
        }

        if (!reg.test(emailv)) {
            alert('邮箱格式不正确')
            email.focus()
            return false
        }

        if (H.trim(passv) == '') {
            alert('密码不能为空')
            pass.focus()
            return false
        }
         
        encode_pass.value = honey.encodePassword(passv)
        form.submit()
        var t = setTimeout(function() {
            H.header.init()
            t = null
        }, 1000)
        return false
    },
    showMsgBox = function() {
        var 
        box = doc.getElementById('top-msg-box'),
        styles = {
            'none': ['block', 'message mes-on'],
            'block': ['none', 'message'] 
        },
        display = styles[box.style.display]

        box.style.display = display[0]
        this.className = display[1]

        return false
    },
    thirdLogin = function() {
        var 
        type = ''+ this.href.split('#')[1],
        urls = {
            '100': 'qq', '110': 'tencent', '200': 'weibo'
        },
		url = 'http://oauth.hunantv.com/'+ urls[type] +'/login/web?from=www&rs='+ current_url
		window.location = url
        return false
    },
    setHomePage = function() {
        var url = 'http://www.hunantv.com'
        try {
            body.style.behavior = 'url(#default#homepage)'
            body.setHomePage(url)
        } catch(e) {
            if(window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch(e) {
                    alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'")
                }
            } else {
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+ url +"】设置为首页。")
            }
        }
        return false
    }


    
    H.header = {
    
        init: function(_id, _options) {

            //var 
            //s = doc.getElementsByTagName("script"),
            //l = s.length

            con = con || doc.getElementById(_id)
            script = doc.createElement('script')
            script.src = api +'&r='+ Math.random()
            
            con.appendChild(script)
            
            //s[l-1].parentNode.insertBefore(script, s[l-1])
            options = _options || {}
        },

        back: function(_data) {
            var 
            data = _data.result.userinfo,
            _tpl = (!data)
                ? tpl.basic
                : [tpl.ok, data.actived = ~~data.active_type][0]

            !data && (data = {})
            data.options = options

            data.is_home = !!current_url.match(/hunantv\.com(\/?)$/)

            var
            html = Mustache.render(_tpl, data)
            con.innerHTML = html
            //console.log(html)

            //if (!data.userinfo) {
            bindEvent()
            //}

            //removeTag()
        }
    }

})
 
