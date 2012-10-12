// login dialog 
// using in hunantv.com, i.hunantv.com
// Lian Hsueh 10.11/2012

honey.def('mod_dialog', function(H) {
    
    // TODO
    //  if css loader errors, must do something
    H.css(CSS +'/widget/login.dialog.css')
    if (honey.ie && honey.ie < 9) {
        H.css(CSS +'/widget/login.dialog.ie.css')
    }

    var 
    dialog = null,
    id = 'honey-login-dialog',
    texts = {
        title: '使用金鹰网帐号登录',
        email: '注册邮箱',
        password: '密码',
        submit: '登 录',
        setcookie: '自动登录',
        forgetpass: '忘记密码？',
        signup: '还没有金鹰网帐号？<a href="http://passport2.hunantv.com/index.php?ac=register">马上注册</a>'
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
            '<p class="h10"></p>',
            '<p><input class="honey-login-input" type="text" placeholder="'+ texts.email +'"/></p>',
            '<p><input class="honey-login-input" type="password" placeholder="'+ texts.password +'"/></p>',
            '<div class="clearfix mt10 actions">',
                '<input type="button" class="honey-login-submit" value="'+ texts.submit +'">',
                '<span class="set-cookies">',
                '<input type="checkbox" class="honey-login-checkbox">',
                '<label>'+ texts.setcookie +'</label>',
                '</span>',
                '<span class="forget-pass">',
                '<a href="#" >'+ texts.forgetpass +'</a>',
                '</span>',
                '<p class="clearfix">'+ texts.signup +'</p>',
            '</div>',
        '</div>'
    ].join('')

    H.loginDialog = function() {
        if (!dialog)
            dialog = new H.dialog({
                id: 'honey-login-dialog',
                html: html,
                content: con_html,
                height: 265,
                width: 355
            })
        dialog.open()
    }


})
