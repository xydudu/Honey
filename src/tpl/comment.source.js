// comment template
// new style
// 注：此文件采用无分号风格

honey.def('lib:jquery', function(H) {
    
    (!H.commentTpl) && (H.commentTpl = {})

    var 
    current_url = window.location.href,
    spp_url = 'http://spp.hunantv.com/passport/service.php?',
    logout_url = spp_url +'action=logout&ref='+ encodeURIComponent(current_url)    

    H.commentTpl.ihunantv = {

        actions_nologin: ''
            + '<div class="comment-input" id="honey-comment-login-form">'
            + '<form method="post" '
            + 'action="http://spp.hunantv.com/passport/service.php?action=login">'
            + '<input type="hidden" name="ref" value="'+ current_url +'" />'
            + '<p> '
            + '帐号：<input type="text" name="email" class="honey-comment-email" />'
            + '密码：<input type="password" name="password" class="honey-comment-pass"/>'
            + '<span> </span>'
            + '<button class="btn submit" value="honey-comment-login-form" >登录</button>'
            + '<a target="_blank" href="http://i.hunantv.com/register" >新用户注册</a>'
            + '</p>'
            + '</form>'
            + '<div class="textarea">'
            + '<textarea disabled="disabled">请登录后评论</textarea>'
            + '</div>'
            + '</div>'

        , actions: '<div class="com-box-til">'
            + '<h5>'
            + '<img src="{{user.avatar}}" width="30"/>'
            + '<a name="comment--" target="_blank" '
            + 'href="http://i.hunantv.com/{{user.user_id}}">'
            + '<em>{{user.nickname}} </em>欢迎您！ </a>'

            + '{{^user.is_active}}'
            + '<a target="_blank" href="http://i.hunantv.com">'
            + '<em>完善资料</em>才可以发表评论</a>'
            + '{{/user.is_active}}'

            + '{{#user.is_active}}'
            + '<a href="http://i.hunantv.com/comment">我的评论</a>'
            + '{{/user.is_active}}'

            + '<span>|</span>'
            + '<a href="'+ logout_url +'">'
            + '登出>></a>'

            + '</h5>'

            + '{{#mood}}'
            + '<div class="combox-face-main clearfix">'
            + '<a href="javascript:" class="all-a" ></a>'
            + '<p class="combox-face">'
            + '<a href="javascript:" class="face-1"></a>'
            + '<a href="javascript:" class="face-2"></a>'
            + '<a href="javascript:" class="face-3"></a>'
            + '<a href="javascript:" class="face-4"></a>'
            + '<a href="javascript:" class="face-5"></a>'
            + '</p>'
            + '</div>'
            + '{{/mood}}'

            + '</div>'
            + '<div class="comment-input">'
            + '<div class="textarea">'
            + '<div class="notice"></div>'
            + '<textarea placeholder="输入你想说的话"></textarea>'
            + '</div>'
            + '</div>'
            + '<div class="actions clearfix">'
            + '<div class="fr">'

            + '{{#is_code}}'
            + '验证码：<input type="text" class="verify-input" maxlength="4" /> '
            + '<img width="90" class="verify-img" style="display:inline-block" height="30" src="http://comment.hunantv.com/comment/checkcode?'+ Math.random() +'" />'
            + '{{/is_code}}'

            + ' <button class="btn comment-submit">发表</button>'
            + '</div>'
            + '<span>文明上网，理性发言</span>'
            + '</div>'

        , reply: '<div class="reply" id="reply-{{id}}">'
            + '<div class="arrow"></div>'
            + '<table>'
            + '{{#user.is_active}}'
            + '<tr>'
            
            + '<td class="reply-input">'
            + '<div class="notice"></div>'
            + '<input type="text" />'
            + '</td>'

            + '</tr>'
            + '<tr>'

            + '<td class="reply-button">'
            + '<span>文明上网，理性发言</span>'

            + '<div class="fr">'
            + '{{#need_verify}}'
            + '验证码：<input type="text" maxlength="4" class="verify-input" /> <img class="verify-img" '
            + 'src="http://comment.hunantv.com/comment/checkcode?'+ Math.random() +'" style="display:inline-block" width="90" height="30" />'
            + '{{/need_verify}}'


            + ' <button class="btn" value="reply-{{id}}">发送</button></td>'
            + '</div>'

            + '</tr>'
            + '{{/user.is_active}}'

            + '{{^user.is_active}}'
            + '<tr>'
            + '<td class="reply-input">'
            + '<p><a target="_blank" href="http://i.hunantv.com/{{user.use_id}}">{{user.nickname}}</a> | '
            + '完善资料才可以发表评论 '
            + '<a target="_blank"  href="http://i.hunantv.com">马上完善</a></p>'
            + '</td>'
            + '</tr>'
            + '{{/user.is_active}}'

            + '</table>'
            + '</div>'

        ,reply_nologin: '<div class="reply" id="reply-{{id}}">'
            + '<div class="arrow"></div>'
            + '<table>'
            + '<tr>'
            + '<td class="reply-login">'

            + '<form method="post" '
            + 'action="http://spp.hunantv.com/passport/service.php?action=login">'
            + '帐号：<input type="text" name="email" class="honey-comment-email" /> '
            + '密码: <input type="password" name="password" class="honey-comment-pass"/>'
            + '<span></span>'
            + '<button class="btn submit" value="reply-{{id}}">登录</button>'
            + '<span></span>'
            + '<input type="hidden" name="ref" value="'+ current_url +'" />'
            + '<a target="_blank" href="http://i.hunantv.com/register">新用户注册</a>'
            + '</form>'

            + '</td>'
            + '</tr>'
            + '<tr><td class="nologin-info">请登录后回复</td></tr>'
            + '</table>'
            + '</div>'

        , pageList: ''
            + '<a href="#{{prev}}" class="prev page-btnl">&nbsp;</a>'

            + '{{#pages}}'
            + '<a href="#{{.}}" '

            + '{{#current}}'
            + ' class="on" '
            + '{{/current}}'

            + '>{{.}}</a>'
            + '{{/pages}}'

            + '<a href="#{{next}}" class="next page-btnr">&nbsp;</a>'

        , list: '<li id="honey-comment-item-{{comment_id}}" class="clearfix">'
            + '<div class="honey-comment-avatar">'

            + '{{#mood}}'
            + '{{^ie}}'
            + '<span class="emo-small-{{mood}}"></span>'
            + '{{/ie}}'
            + '{{#ie}}'
            + '<span class="emo-small-{{mood}}" '
            + ' style="background:none"><img src="'+ IMG +'/icon/emo-small-{{mood}}.gif"/></span>'
            + '{{/ie}}'
            + '{{/mood}}'

            + '<a href="http://i.hunantv.com/{{user.user_id}}" '
            + ' id="position-{{comment_id}}">'
            + '<img src="{{user.avatar_key}}" width="60"/></a>'

            + '<p>{{no}} 楼</p>'
            + '</div>'

            + '<div class="honey-comment-body">'
            + '<p class="top">'
            + '<span class="fr time">{{create_time}}</span>'
            + '<a href="http://i.hunantv.com/{{user.user_id}}" >{{user.nickname}}</a> [{{user.location}}]'
            + '</p>'

            
            + '{{#origin_comment}}'
            + '<div class="origin-content">'
            //+ '<div class="arrow"></div>'
            + '<p>'
            + '回复 <a href="http://i.hunantv.com/{{user.user_id}}">{{origin_comment.user.nickname}}</a>： '
            + '{{origin_comment.content}}</p>'
            + '</div>'
            + '{{/origin_comment}}'

            + '<p class="content">'
            + '{{content}}'
            + '</p>'
            
            + '<p class="actions">'
            + '<a href="#{{comment_id}}" class="add-reply">回复</a>'
            + '</p>'
            + '</div>'
            + '</li>'
    }

    H.commentTpl.enthunantv = {
        actions_nologin: H.commentTpl.ihunantv.actions_nologin
        , actions: H.commentTpl.ihunantv.actions
        , reply: H.commentTpl.ihunantv.reply
        , reply_nologin: H.commentTpl.ihunantv.reply_nologin
        , pageList: H.commentTpl.ihunantv.pageList
        , list: '<li id="honey-comment-item-{{comment.comment_id}}" class="clearfix">'
            + '<div class="honey-comment-avatar">'
            + '<a href="http://i.hunantv.com/{{comment.user.user_id}}" id="position-{{comment.floor_id }}">'
            + '<img src="{{comment.user.avatar_key}}" width="60"/>'
            + '</a>'
            
            + '<p>{{no}} 楼</p>'
            + '</div>'
            + '<div class="honey-comment-body">'
            + '<p class="top">'
            + '<span class="fr time">{{comment.create_time}}</span>'
            + '<a href="http://i.hunantv.com/{{comment.user.user_id}}" >{{comment.user.nickname}}</a> [{{comment.user.location}}]'
            + '</p>'

            + '{{#comments}}'
            + '<div class="origin-contents">' 
            + '{{/comments}}'

            + '{{#comments}}'
            + '<p>'
            + '<small>{{no}}</small>'
            + '<span><a href="http://i.hunantv.com/{{user.user_id}}">回复 {{user.nickname}}</a> [{{user.location}}]</span>'
            + '{{content}}'
            + '</p>'
            + '</div>'
            + '{{/comments}}'

            + '<p class="content">'
            + '{{comment.content}}'
            + '</p>'
            
            + '<p class="actions">'
            + '<a href="#{{comment.floor_id}}" class="up-comment">顶 '
            + '<strong>[ {{comment.up_num}} ]</strong></a>'
            + '<a href="#{{comment.comment_id}}" class="add-reply">回应</a>'
            //+ '<a href="#{{comment.comment_id}}" class="copy">复制</a>'
            + '</p>'
            + '</div>'
            + '</li>'
    }

})
