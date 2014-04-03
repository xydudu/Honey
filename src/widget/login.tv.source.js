// login dialog 
// using in new hunantv.com
// Lian Hsueh 04.03/2014


honey.def('mod:dialog, plugin:pswencode ', function(H) {
    
    "use strict"
    // TODO
    //  if css loader errors, must do something

    H.css('http://honey.hunantv.com/hunantv.imgotv/css/page/webfloat/page-dialog-login.css')

    var 
    dialog = null,
    current_url = window.location.href,
    id = 'honey-login-dialog',
    verify_url = '',
    texts = {
        title: '登录',
        email: '邮箱/手机',
        password: '请输入密码',
        submit: '登 录',
        verify: '验证码',
        setcookie: '记住我',
        forgetpass: '忘记密码？',
        needsignup: '没有账号？ <a href="http://i.hunantv.com/register" target="_blank">马上注册</a>',
        signup: '<a target="_blank" href="http://i.hunantv.com/register">注册</a>'
    },
    html = [
        '<div class="page-float clearfix"  id="'+ id +'">',
        '<div class="honey-dialog-conBox page-float-main clearfix">',
        '</div>',
        '</div>'

    ].join(''),
    con_html = [
        '<p class="page-float-bg"></p>',
        '<a class="page-float-close honey-dialog-close" href="#">关闭</a>',
        '<div class="page-float-box clearfix">',
        '<div class="clearfix page-login-main">',
        '<div class="page-login-main-til">',
        '<a href="#" class="t-on">'+ texts.title +'</a>',
        //texts.signup,
        '</div>',
        '<div class="page-login-main-box clearfix"> ',
        '<div class="login-form clearfix">',
        '<p class="lf-box clearfix">',
        '<input type="text" class="mgtv-input1 email" placeholder="'+ texts.email +'"',
        ' name="email">',
        '</p>',
        '<p class="lf-box clearfix">',
        '<input type="text" class="mgtv-input1 password1" placeholder="'+ texts.password +'">',
        '<input type="hidden" class="password" name="password" />',
        '</p>',

        //'<p class="lf-box clearfix">',
        //'<input type="text" name="verify-code" placeholder="'+ texts.verify +'" class="mgtv-input1 mgtv-iw150">',
        //'<span class="mgtv-yzm"><img src="'+ verify_url +'"></span>',
        //'<span class="mgtv-ts1"><a href="javascript:" class="change-verify">换一张</a></span>',
        //'</p>',

        '<p class="lf-box lb-txt1 lf-radio clearfix">',
        '<label class="span-radio">',
        '<input type="checkbox" name="rem" value="1" />'+ texts.setcookie +'</label>',
        '<a href="http://passport2.hunantv.com/index.php?ac=findpass">'+ texts.forgetpass +'</a>',
        '</p>',
        // notice
        //'<p class="lf-box lb-txt1 clearfix">',
        //'<span class="mgtv-ts4">用户名或密码不正确</span>',
        //'</p>',
        //notice end
        '<p class="lf-box login-btn clearfix">',
        '<a href="javascript:" id="honey-dialog-submit" class="mgtv-b8030 mgtv-b11040">登录</a>',
        '<span class="mgtv-ts1">'+ texts.needsignup +'</span>',
        '</p>',
        '</div>  ',
        '<div class="plmb-right">',
        '<p class="plmb-right-til">使用第三方账号登录</p>',
        '<p class="plmb-right-btn thired-parts">',
        '<a class="mgtv-bqq qq" href="#100">QQ账号</a>',
        '<a class="mgtv-bsina sina" href="#200">新浪微博</a>',
        '</p>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'

    ].join('')

    H.loginDialog = function() {
        if (!dialog) {
            dialog = new H.dialog({
                id: 'honey-login-dialog',
                html: html,
                content: con_html,
                height: 330,
                width: 700,
                opacity: 0.5
            })
            dialog.init()
            dialog.find('#honey-dialog-submit').click(login)
            dialog.find('.thired-parts a').click(third)

            $(document).keydown(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which)
                if(keycode == '13'){
                    login.call(this, event)
                }
            })
            if ($.fn.placeholder) {
                dialog.find('input').placeholder()
            }
        }
        dialog.open()
    }

    function showLoading(_) {
        _.addClass('bl-loading')
        _.find('em').show()
    }
    function hideLoading(_) {
        _.removeClass('bl-loading')
        _.find('em').hide()
    }

    function login(e) {
        e.preventDefault() 
        var 
        _ = $(this),
        reg = /^([a-zA-Z0-9\_\.\-])+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi,
        form = dialog.find('form'),
        email = form.find('.email'),
        emailv = email.val(),
        pass1 = form.find('.password'),
        pass = form.find('.password1'),
        passv = pass.val()

        showLoading(_)
        
        if ($.trim(emailv) == '') {
            alert('请输入您的金鹰网帐号')
            email.focus()
            hideLoading(_)
            return false
        }

        if (!reg.test(emailv)) {
            alert('邮箱格式不正确')
            email.focus()
            hideLoading(_)
            return false
        }

        if ($.trim(passv) == '') {
            alert('密码不能为空')
            pass.focus()
            hideLoading(_)
            return false
        }
         
        pass1.val(honey.encodePassword(passv))
        form.submit()
    }

    function third() {
        var 
        type = ''+ this.href.split('#')[1],
        urls = {
            '100': 'qq', '110': 'tencent', '200': 'weibo'
        },
		url = 'http://oauth.hunantv.com/'+ urls[type] +'/login/web?from=www&rs='+ current_url
		window.location = url

    }

})
