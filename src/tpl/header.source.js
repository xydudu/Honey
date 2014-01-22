// template for public header
// Lian Hsueh
//


/*
<div class="mod-snav clearfix">
    <div class="topnav">
        <div class="topnav-l">
            <span class="home"><a href="#">设为首页</a></span>
            <span class="mobile"><a href="#">手机客户端</a></span>
            <span class="mgtvlogo"><a href="#">芒果TV</a></span>
        </div>
        <div class="topnav-r">
            <div class="not-login">
                <a href="#">新用户注册</a>
                <a href="#" class="login">登录</a>
            </div>
        </div>
    </div>
</div>
*/

honey.def(function(H) {
    
    var i = '//i.hunantv.com'
    H.headerTpl = {
        basic: '<div class="mod-snav clearfix">'
            + '<div class="topnav">'
            + '<div class="topnav-l">'
            + '<span class="home"><a href="//www.hunantv.com" target="_blank" id="set-home" >设为首页</a></span>'
            + '<span class="mobile"><a href="//www.hunantv.com/app" target="_blank"  >手机客户端</a></span>'
            
            + '{{#options.show_imgotv}}'
            + '<span class="mgtvlogo"><a href="http://www.imgo.tv/" target="_blank"  >芒果TV</a></span>'
            + '{{/options.show_imgotv}}'

            + '</div>'
            + '<div class="topnav-r" id="top-login-userinfo">'
            + '<div class="not-login">'
            + '<a href="http://i.hunantv.com/register" target="_blank" >新用户注册</a>'
            + '<a href="javascript:" id="top-login-trigger" class="login">登 录</a>'
            + '</div>' // .not-login
            + '<div id="top-login-box" style="display:none" class="login-con"></div>'
            + '</div>' // .topnav-r
            + '</div>' // .topnav
            + '</div>',
        
        ok: '<div class="mod-snav clearfix">'
            + '<div class="topnav">'
            + '<div class="topnav-l">'
            //+ '<span class="home">金鹰网首页</span>'
            //+ '<span class="mobile">手机客户端</span>'
            + '<span class="home"><a href="//www.hunantv.com" target="_blank" id="set-home" >设为首页</a></span>'
            + '<span class="mobile"><a href="//www.hunantv.com/app" target="_blank"  >手机客户端</a></span>'

            + '{{#options.show_imgotv}}'
            + '<span class="mgtvlogo"><a href="http://www.imgo.tv/" target="_blank"  >芒果TV</a></span>'
            + '{{/options.show_imgotv}}'

            + '</div>'
            + '<div class="topnav-r">'
            + '<div class="login-after clearfix">'
            + '<a href="http://spp.hunantv.com/passport/service.php?action=logout&ref='
            + encodeURIComponent(window.location.href) +'"'
            + ' class="exit">退出</a>'
            + '<a href="javascript:" id="top-msg-trigger" '
            + 'class="message">{{msg_total}}</a>'
            + '{{^actived}}'
            + '<a href="#" class="not-v">未验证用户</a>'
            + '{{/actived}}'

            + '<p class="name">'
            + '<span class="ico"></span>'
            + '<a target="_blank"  href="'+ i +'/{{uid}}" >{{nickname}}</a>'
            + '<span class="txt">欢迎回来！</span></p>'

            + '</div>'
            + '<ul class="mes-list" id="top-msg-box" style="display:none">'
            + '<li><a target="_blank" href="'+ i +'/message/unread"><span>新私信</span><em>{{message_count}}</em></a></li>'
            + '<li><a target="_blank" href="'+ i +'/notice/system"><span>通知</span><em>{{sysnotice_count}}</em></a></li>'
            + '<li><a target="_blank" href="'+ i +'/comment"><span>新评论</span><em>{{comment_count}}</em></a></li>'
            + '<li><a target="_blank" href="'+ i +'/notice/friendconfirm"><span>好友请求</span><em>{{addfriendnotice_count}}</em></a></li>'
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
            + '<p><input id="top-login-password" placeholder="Password" '
            + 'class="txt-int" type="password"></p>'
            + '<input type="hidden" name="password" id="top-login-encodepass" />'
            + '<p class="btn">'
            + '<a href="javascript:" id="top-login-button" class="btn-login">登 录</a>'
            + '<label><input type="checkbox" name="rem">下次自动登录 |</label>'
            + '<a target="_blank" href="http://passport2.hunantv.com/index.php?ac=findpass" class="forget">忘记密码</a>'
            + '</p>'
            + '</div>'
            + '<div class="cb-r">'
            + '<p class="wb-til">第三方帐号登录</p>'
            + '<p class="weibo">'

            + '<a href="#200" id="third-login-sina" class="sina">新浪</a>'
            + '<a href="#110" id="third-login-tqq" class="tx">腾讯微博</a>'
            + '<a href="#100" id="third-login-qq" class="qq">QQ</a>'

            + '</p>'
            + '</div>'
            + '</div>'
            + '</form>'
            + '<iframe style="display:none" id="top-login-iframe" name="top-login-iframe"></iframe>'
    } 


})

