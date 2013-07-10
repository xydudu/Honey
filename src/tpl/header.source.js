// template for public header
// Lian Hsueh
//

honey.def(function(H) {
    
    var i = '//i.hunantv.com'
    H.headerTpl = {
        basic: '<div class="mod-snav clearfix">'
            + '<div class="topnav">'
            + '<div class="topnav-l">'
            + '<span class="home">金鹰网首页</span>'
            + '<span class="mobile">手机客户端</span>'
            + '</div>'
            + '<div class="topnav-r" id="top-login-userinfo">'
            + '<div class="not-login">'
            + '<a href="/login">新用户注册</a>'
            + '<a href="javascript:" id="top-login-trigger" class="login">登录</a>'
            + '</div>' // .not-login
            + '<div id="top-login-box" style="display:none" class="login-con"></div>'
            + '</div>' // .topnav-r
            + '</div>' // .topnav
            + '</div>',
        
        ok: '<div class="mod-snav clearfix">'
            + '<div class="topnav">'
            + '<div class="topnav-l">'
            + '<span class="home">金鹰网首页</span>'
            + '<span class="mobile">手机客户端</span>'
            + '</div>'
            + '<div class="topnav-r">'
            + '<div class="login-after">'
            + '<a href="http://spp.hunantv.com/passport/service.php?action=logout&ref='
            + encodeURIComponent(window.location.href) +'"'
            + ' class="exit">退出</a>'
            + '<a href="javascript:" id="top-msg-trigger" '
            + 'class="message">{{msg_total}}</a>'
            + '{{^actived}}'
            + '<a href="#" class="not-v">未验证用户</a>'
            + '{{/actived}}'
            + '<a href="'+ i +'/{{uid}}" '
            + 'class="name"><span class="ico"></span><em>{{nickname}}</em><span class="txt">欢迎回来！</span></a>'
            + '</div>'
            + '<ul class="mes-list" id="top-msg-box" style="display:none">'
            + '<li><a href="'+ i +'/message/unread"><span>新私信</span><em>{{message_count}}</em></a></li>'
            + '<li><a href="'+ i +'/notice/system"><span>通知</span><em>{{sysnotice_count}}</em></a></li>'
            + '<li><a href="'+ i +'/comment"><span>新评论</span><em>{{comment_count}}</em></a></li>'
            + '<li><a href="'+ i +'/notice/friendconfirm"><span>好友请求</span><em>{{addfriendnotice_count}}</em></a></li>'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '</div>',

        login: '<form action="http://spp.hunantv.com/passport/service.php?action=login"'
            + ' method="post" id="top-login-form" target="top-login-iframe" >'
            + '<p class="login-til">帐号登录</p>'
            + '<div class="con-box">'
            + '<div class="cb-l">'
            + '<p><input id="top-login-email" name="email" placeholder="Email" '
            + 'class="txt-int" type="text"></p>'
            + '<p><input id="top-login-password" name="password" placeholder="Password" '
            + 'class="txt-int" type="password"></p>'
            + '<p class="btn">'
            + '<a href="javascript:" id="top-login-button" class="btn-login">登 陆</a>'
            + '<label><input type="checkbox" name="rem">下次自动登录 |</label>'
            + '<a href="#" class="forget">忘记密码</a>'
            + '</p>'
            + '</div>'
            + '<div class="cb-r">'
            + '<p class="wb-til">第三方帐号登录</p>'
            + '<p class="weibo">'
            + '<a href="#" class="sina">新浪</a>'
            + '<a href="#" class="tx">腾讯微博</a>'
            + '<a href="#" class="qq">QQ</a>'
            + '</p>'
            + '</div>'
            + '</div>'
            + '</form>'
    } 


})

