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
        title: '使用金鹰网帐号登录',
        email: '注册邮箱',
        password: '密码',
        submit: '登 录',
        setcookie: '自动登录',
        forgetpass: '忘记密码？',
        signup: '还没有金鹰网帐号？<a target="_blank" href="http://i.hunantv.com/register">马上注册</a>'
    },
    html = [
        '<div class="mod-dialog pr" id="'+ id +'">',
            '<div class="black pa"></div>',
            '<div class="dialog-wrap honey-dialog-conBox">',
            '</div>',
        '</div>'
    ].join(''),
    con_html = [
        '<h3 class="clearfix">',
            '<span class="fl ml15">'+ texts.title +'</span>',
            '<a href="javascript:" class="fr cancel-dialog-bt hide-text honey-dialog-close" title="关闭">关闭</a>',
        '</h3>',
        '<div class="info">',
            '<form action="http://spp.hunantv.com/passport/service.php?action=login" method="post" >',
            '<p class="h10"></p>',
            '<p><input class="honey-login-input email" name="email" type="text" placeholder="'+ texts.email +'"/></p>',
            '<p><input class="honey-login-input password" name="password" type="password" placeholder="'+ texts.password +'"/></p>',
            '<div class="clearfix mt10 actions">',
                '<input type="button" id="honey-dialog-submit" class="honey-login-submit" value="'+ texts.submit +'">',
                '<span class="set-cookies">',
                '<input type="checkbox" name="rem" class="honey-login-checkbox">',
                '<label>'+ texts.setcookie +'</label>',
                '</span>',
                '<span class="forget-pass">',
                '<a target="_blank" href="http://passport2.hunantv.com/index.php?ac=findpass" >'+ texts.forgetpass +'</a>',
                '</span>',
                '<p class="clearfix noborder">'+ texts.signup +'</p>',
                '<p class="clearfix thired-parts">',
                '<span>',
                '第三方帐号登录',
                '</span>',
                '<a href="#200"><i class="sina"></i>新浪微博</a>',
                '<a href="#110"><i class="tqq" ></i>腾讯微博</a>',
                '<a href="#100"><i class="qq"  ></i>QQ帐号</a>',
                '</p>',
                '<input type="hidden" name="ref" value="'+ current_url +'" />',
            '</div>',
            '</form>',
        '</div>'
    ].join('')

    H.loginDialog = function() {
        if (!dialog) {
            dialog = new H.dialog({
                id: 'honey-login-dialog',
                html: html,
                content: con_html,
                height: 332,
                width: 355
            })
            dialog.init()
            dialog.find('#honey-dialog-submit').click(login)
            dialog.find('.thired-parts a').click(third)
        }
        dialog.open()
    }

    function login(e) {
        e.preventDefault() 
        var 
        reg = /^([a-zA-Z0-9\_\.\-])+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi,
        form = dialog.find('form'),
        email = form.find('.email'),
        emailv = email.val(),
        pass = form.find('.password'),
        passv = pass.val()
        
        if ($.trim(emailv) == '') {
            alert('请输入您的金鹰网帐号')
            email.focus()
            return false
        }

        if (!reg.test(emailv)) {
            alert('邮箱格式不正确')
            email.focus()
            return false
        }

        if ($.trim(passv) == '') {
            alert('密码不能为空')
            pass.focus()
            return false
        }
         
        pass.val(honey.encodePassword(passv))
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
