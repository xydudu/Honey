// header
// Lian Hsueh 7.5/2013
// modified: none


honey.def('lib:mustache, tpl:header, plugin:pswencode', function(H) {

    'use strict'
    
    var 
    script,
    doc = window.document,
    current_url = window.location.href,
    body = doc.body, 
    tpl = H.headerTpl,
    api = 'http://app.i.hunantv.com/api/newuserstatus/?jsoncallback=honey.header.back',
    con,
    top_login_trigger
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
        return container.contains ? container.contains(maybe) :
            !!(container.compareDocumentPosition(maybe) & 16);
    },
    removeTag = function() {
        body.removeChild(script) 
        script = null
    },
    bindEvent = function() {
        con.onclick = function(_e) {
            var 
            event = _e || window.event,
            target = event.target || event.srcElement,
            funcs = {
                "top-login-trigger": showLogin,
                "top-login-button": loginSubmit,
                "top-msg-trigger": showMsgBox,
                "third-login-sina": thirdLogin,
                "third-login-tqq": thirdLogin,
                "third-login-qq": thirdLogin
            }
            return funcs[target.id] && funcs[target.id].call(target)
        }

        con.onmouseover = function(_e) {
            var 
            event = _e || window.event,
            target = event.target || event.srcElement

            if (target.id === 'top-msg-trigger') {
                showMsgBox.call(target)
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

            if (!contains(box, relTarg)) {
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
    showLogin = function() {
        var 
        box = doc.getElementById('top-login-box'),
        display = box.style.display

        if (display === 'none') {
            (box.innerHTML === '')
                && (box.innerHTML = tpl.login)
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
		url = 'http://oauth.hunantv.com/'+ urls[type] +'/login/web?rs='+ current_url
		window.location = url
        return false
    }

    
    H.header = {
    
        init: function(_id) {
            con = con || doc.getElementById(_id)
            script = doc.createElement('script')
            script.src = api
            body.appendChild(script)
        },

        back: function(_data) {
            var 
            data = _data.result.userinfo,
            _tpl = (!data)
                ? tpl.basic
                : [tpl.ok, data.actived = ~~data.active_type][0],
            html = Mustache.render(_tpl, data)
            con.innerHTML = html
            //if (!data.userinfo) {
            bindEvent()
            //}

            removeTag()
        }
    }

})
 
