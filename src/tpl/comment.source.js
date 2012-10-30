// comment template
// 注：此文件采用无分号风格

honey.def('lib:jquery', function(H) {
    
    (!H.commentTpl) && (H.commentTpl = {})

    H.commentTpl.ihunantv = {
        actions_nologin: '<div class="comment-input">'
            + '<p>'
            + '帐号：<input type="text" />'
            + '密码: <input type="password" />'
            + '<span> </span>'
            + '<button class="btn" >登录</button>'
            + '<a href="#" >新用户注册</a>'
            + '</p>'
            + '<div class="textarea">'
            + '<textarea disabled="disabled">请登录后评论</textarea>'
            + '</div>'
            + '</div>',

        actions: '<h5>'
            +'<img src="{{user.avatar}}" width="30"/>'
            + '<a href="#">{{user.nickname}}</a>'
            + '<span>|</span>'
            + '<a href="#">我的评论</a>'
            + '<span>|</span>'
            + '<a href="#">安全退出</a>'
            + '</h5>'
            + '<div class="comment-input">'
            + '<h4>看它时的心情</h4> '
            + '<i class="emo-1"></i>'
            + '<i class="emo-2"></i>'
            + '<i class="emo-3"></i>'
            + '<i class="emo-4"></i>'
            + '<i class="emo-5"></i>'
            //+ '<i class="selected"></i>'
            + '<div class="textarea">'
            + '<textarea placeholder="输入你想说的话"></textarea>'
            + '</div>'
            + '</div>'
            + '<div class="actions clearfix">'
            + '<button class="btn fr comment-submit">发送</button>'
            + '<div class="">'
            + '同步到：'
            + '<i class="sina-ico"></i> 新浪微博'
            + '<input type="checkbox" />'
            +''
            + '<i class="qq-ico"></i> 腾讯微博'
            + '<input type="checkbox" />'
            +''
            + '<i class="qzone-ico"></i> QQ空间'
            + '<input type="checkbox" />'
            + '</div>'
            + '</div>',

        reply: '<div class="reply" id="reply-{{.}}">'
            + '<div class="arrow"></div>'
            + '<table>'
            + '<tr>'
            + '<td class="reply-input"><input type="text" /></td>'
            + '<td class="reply-button"><button class="btn" value="reply-{{.}}">发送</button></td>'
            + '</tr>'
            + '</table>'
            + '</div>',

        pageList: '<a class="first" href="#{{first}}"></a>'
            + '<a class="prev" href="#{{prev}}" ></a>'
            + '{{#pages}}'
            + '<a href="#{{.}}" '
            + '{{#current}}'
            + 'class="current"'
            + '{{/current}}'
            + '>{{.}}</a>'
            + '{{/pages}}'
            + '<a class="next" href="#{{next}}"></a>'
            + '<a class="end" href="#{{end}}" ></a>',

        list: '<li id="honey-comment-item-{{comment_id}}" class="clearfix">'
            + '<div class="honey-comment-avatar">'
            + '<a href="#">'
            + '<img src="{{user.avatar_key}}" width="50"/>'
            + '</a>'

            + '{{#mood}}'
            + '{{^ie}}'
            + '<span class="emo-small-{{mood}}"></span>'
            + '{{/ie}}'
            + '{{#ie}}'
            + '<span class="emo-small-{{mood}}" '
            + ' style="background:none"><img src="'+ IMG +'/icon/emo-small-{{mood}}.gif"/></span>'
            + '{{/ie}}'
            + '{{/mood}}'

            + '<p>{{no}} 楼</p>'
            + '</div>'
            + '<div class="honey-comment-body">'
            + '<p class="top">'
            + '<span class="fr time">{{create_time}}</span>'
            + '<a href="#" >{{user.nickname}}</a> [{{user.location}}]'
            + '</p>'

            
            + '{{#origin_comment}}'
            + '<div class="origin-content">'
            //+ '<div class="arrow"></div>'
            + '<p>'
            + '<a href="#">@{{origin_comment.user.nickname}}</a> '
            + '{{origin_comment.content}}</p>'
            + '</div>'
            + '{{/origin_comment}}'

            + '<p class="content">'
            + '{{content}}'
            + '</p>'
            
            + '<p class="actions">'
            + '<a href="#{{comment_id}}" class="add-reply">回应</a>'
            + '</p>'
            + '</div>'
            + '</li>'
    }

})
