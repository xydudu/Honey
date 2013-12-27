// login dialog 
// using in hunantv.com, i.hunantv.com
// Lian Hsueh 10.11/2012

honey.def('mod:dialog, plugin:pswencode ', function(H) {
    
    // TODO
    //  if css loader errors, must do something
    H.css(CSS +'/widget/login.dialog.css')
    if (honey.ie && honey.ie < 9) {
        H.css(CSS +'/widget/login.dialog.ie.css')
    }

    var 
    dialog = null,
    current_url = window.location.href,
    id = 'honey-login-dialog',
    texts = {
        title: '帐号登录',
        email: '邮箱帐号',
        password: '请输入密码',
        submit: '登 录',
        setcookie: '下次自动登录',
        forgetpass: '忘记密码？',
        needsignup: '还没有帐号？',
        signup: '<a target="_blank" class="zc-btn" href="http://i.hunantv.com/register">马上注册</a>'
    },
    html = [
        '<div class="mod-play-login" id="'+ id +'">',
            '<div class="honey-dialog-conBox">',
            '</div>',
        '</div>'
    ].join(''),
    con_html = [
        
        '<a href="#" class="play-login-close"></a>',
        '<form action="http://spp.hunantv.com/passport/service.php?action=login" method="post" >',
        '<div class="con-box clearfix">',
        '<div class="cb-l">',
        '<p class="login-til">'+ texts.title +' | <em>LOGIN</em></p>',
        '<p>',
        '<input type="text" class="txt-int email" placeholder="'+ texts.email +'" name="email" />',
        '</p>',
        '<p>',
        '<input type="password" class="txt-int1 password1" placeholder="'+ texts.password +'" />',
        '</p>',
        '<input type="hidden" class="password" name="password" />',
        '<p class="btn">',
        '<a class="btn-login" id="honey-dialog-submit" href="javascript:">'+ texts.submit +' <em class="loading" style="display:none"></em></a>',
        '<label>',
        '<input type="checkbox" name="rem" />'+ texts.setcookie +' | </label>',
        '<a class="forget" href="http://passport2.hunantv.com/index.php?ac=findpass" target="_blank">'+ texts.forgetpass +'</a>',
        '</p>',
        '</div>',
        '<div class="cb-r">',
        '<p class="wb-til">'+ texts.needsignup +'</p>',
        texts.signup,
        '<p class="wb-til">第三方帐号登录</p>',
        '<p class="weibo thired-parts">',
        '<a class="sina" href="#200">新浪</a>',
        '<a class="tx" href="#110">腾讯微博</a>',
        '<a class="qq" href="#100">QQ</a>',
        '</p>',
        '</div>',
        '</div>',
        '</form>'
    ].join('')

    H.loginDialog = function() {
        if (!dialog) {
            dialog = new H.dialog({
                id: 'honey-login-dialog',
                html: html,
                content: con_html,
                height: 370,
                width: 630,
                opacity: 0.5
            })
            dialog.init()
            dialog.find('#honey-dialog-submit').click(login)
            dialog.find('.thired-parts a').click(third)

            $(document).keydown(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                    login.call(this, event)
                }
            })
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
        }
		url = 'http://oauth.hunantv.com/'+ urls[type] +'/login/web?rs='+ current_url
		window.location = url

    }

})
