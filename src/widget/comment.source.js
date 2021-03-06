// comment using hunantv.com and i.hunantv.com 
// Lian Hsueh 10.24/2012
// modified: none
// 注：此文件采用无分号风格


honey.def('lib:jquery, lib:mustache', function(H) {
    

    var 
    api = 'http://comment.hunantv.com',
    total_num_box = $('.comments-total-nums'),
    current_url = window.location.href.split('#')[0],
    methods = {
        ihunantv: 'icomment',
        enthunantv: 'list'
    },
    rules = {
        ihunantv: {
            empty: '评论内容不能为空',
            verify_err: '验证码不能为空',
            success: '<i></i> 评论提交成功',
            error: '<i></i> 评论提交失败，请刷新后重试',
            comment_max: [300, '输入字符过多，不能超过300字符'],
            comment_min: [6, '输入字符过少，不能少于6个字符']
        },
        enthunantv: {
            empty: '评论内容不能为空',
            verify_err: '验证码不能为空',
            success: '<i></i> 评论提交成功',
            error: '<i></i> 评论提交失败，请刷新后重试',
            comment_max: [600, '输入字符过多，不能超过600字符'],
            comment_min: [6, '输入字符过少，请务必超过6个字']
        }
    },
    win = $(window),
    current_user,
    need_verify = false,
    no = 1, // 楼号
    page_number = 15, //每页条数  不可更改，后端没接口啊。。。
    total_number = 0, //总条数
    len = function(_str) {
        // 把中文字符替换为两个英文，并返回长度
        return _str.replace(/[^\x00-\xff]/g,"xx").length
    },
    refresh_verify = function() {
        var 
        img = this,
        src = img.src +'?'+ Math.random()
        img.src = src
        return false
    },
    current_page = (function() {
        var page = ~~window.location.hash.replace('#', '')
        return page || 1
    })() // 当前页码


    var comment = function(_options) {
        var _ = this
        _.project = _options.project
        _.type = _options.type
        _.hasmood = _options.mood || false
        _.nolist = _options.nolist || false
        _.subject = _options.subject_id

        var css = _options.css || CSS +'/widget/comment.css'
        H.css(css)

        _.tpl = _options.tpl 
            ? H.commentTpl[_options.tpl]
            : H.commentTpl[_.project]
        _.rules = rules[_.project]
        _.box = $('#honey-comment')
        _.listbox = _.box.find('ul')

        _.getList(current_page) 

        _.buildActions()
        _.bindEvents()
        _.buildForm()
    }
    
    // 构建提交表单
    comment.prototype.buildForm = function() {
        /*
        url:http://comment.hunantv.com/comment/post?
        type:(string) 频道
        subject_id:(int) 对象ID
        content:(string) 内容
        fid:(int) 被回复的ID 非必填
        mood:(int)心情ID 非必填
        */
        var 
        _ = this
        , id = 'honey-comment-iframe'
        , iframe = $('<iframe '
                + 'frameborder="0" '
                + 'height="0" '
                + 'name="'+ id +'" '
                + 'id="'+ id +'" '
                + 'width="0"/>')
            .appendTo('body')
        , form = $('<form />')
            .attr({
                action: api +'/comment/post',
                target: id,
                method: 'POST'
            })
            .appendTo('body')
        , upform = $('<form />')
            .attr({
                action: api +'/comment/up',
                target: id,
                method: 'POST'
            })
            .appendTo('body')
        , hiddens = {}
        , uphiddens = {}
        
        $.each({
            type: _.type,
            subject_id: _.subject,
            content: '',
            fid: 0,
            mood: 0,
            method: 'post',
            checkcode: '',
            url: current_url,
            comment_id: 0
        }, function(_name, _value) {
            hiddens[_name] = $('<input />')
                .attr({
                    type: 'hidden',
                    name: _name,
                    value: _value
                }).appendTo(form)
        })

        $.each({
            method: 'post',
            url: current_url,
            comment_id: 0
        }, function(_name, _value) {
            uphiddens[_name] = $('<input />')
                .attr({
                    type: 'hidden',
                    name: _name,
                    value: _value
                }).appendTo(upform)
        })
        
        _.form = form
        _.upform = upform
        _.hiddens = hiddens
        _.uphiddens = uphiddens
        _.iframe = iframe
    }

    comment.prototype.bindEvents = function() {

        var 
        _ = this,
        box = _.box
        _.timer = null
        
        // 表情
        box.on('click', '.comment-input>i', function(e) {
            var 
            o = $(this),
            selected_mood = _.hiddens.mood.val(),
            mood = o.attr('class').split('-')[1],
            select_ico = o.parent().find('.selected')
            _.hiddens.mood.val(mood)
            if (selected_mood === mood) {
                select_ico.remove()
                _.hiddens.mood.val(0)
            }
            if (!select_ico.length)
                select_ico = $('<i class="selected" ></i>').insertAfter(o)
            select_ico.css('left', o.position().left)
            return false
        }) 

        box.on('click', '.all-a', function(e) {
            var 
            o = $(this),
            facebox = o.next('.combox-face')
            if (o.data('opend')) {
                o.data('opend', false)
                o.removeClass('on')
                facebox.hide() 
            } else {
                o.data('opend', true)
                o.addClass('on')
                facebox.show() 
            }
            return false
        })

        $(document).click(function(e) {
            //e.preventDefault()
            var 
            o = box.find('.all-a'),
            facebox = o.next('.combox-face')

            if (o.data('opend')) {
                o.data('opend', false)
                o.removeClass('on')
                facebox.hide() 
            }

        })

        box.on('click', '.combox-face>a', function(e) {
            var o = $(this)

            o.parent('p').find('a').removeClass('on')

            var
            selected_mood = _.hiddens.mood.val(),
            mood = o.attr('class').split('-')[1]

            //select_ico = o.parent().find('.selected')
            _.hiddens.mood.val(mood)

            if (selected_mood === mood) {
                //select_ico.remove()
                _.hiddens.mood.val(0)
                o.removeClass('on')
            } else o.addClass('on')

            //if (!select_ico.length)
            //    select_ico = $('<i class="selected" ></i>').insertAfter(o)
            //select_ico.css('left', o.position().left)

            return false
        })
        
        // 分页
        box.on('click', '.honey-comment-pages>a', function(e) {
            var page = ~~$(this).attr('href').split('#')[1] 
            if (page === current_page) return
            _.getList(page)
            return false 
        })

        // 验证码
        box.on('click', '.verify-img', refresh_verify)

        // 显示回复框
        box.on('click', '.add-reply', function(e) {

            if (H.loginDialog && !current_user) {
                window.location.hash = 'comment--'
                H.loginDialog()
                return false
            }

            var 
            o = $(this),
            id = o.attr('href').split('#')[1],
            tpl = current_user ? _.tpl.reply : _.tpl.reply_nologin,
            item_box = $('#honey-comment-item-'+ id).find('.honey-comment-body'),
            reply_box = $('#reply-'+ id)
            
            if (reply_box.data('show')) {
                o.css('color', '#ccc')
                reply_box.data('show', false).hide()
                return false
            } else {
                o.css('color', '#ff8400')
                reply_box.data('show', true)
                reply_box.show()
            }
            if (!reply_box.length) {
                reply_box = $(Mustache.render(tpl, {
                    user: current_user,
                    id: id,
                    need_verify: need_verify
                }))
                reply_box.data({
                    id: id,
                    show: true
                })
                item_box.append(reply_box)
            }
            item_box.find('.origin-content').length
                && reply_box.data('has-origin', true)
            reply_box.find('input').focus()

            if (need_verify) {
                var src = api +'/comment/checkcode?'+ Math.random()
                $('.verify-img').attr('src', src)
                //$('.verify-img').each(function(_no, _img) {
                //    _img.src = src
                //})
            }
             
            return false 
        })

        // 回复
        box.on('click', '.reply-button button.btn', function() {
            var o = $(this)
            if (o.data('lock')) return false
            o.data('lock', true)

            var 
            reply_box = $('#'+ o.val()),
            fid = reply_box.data('id'),
            input = reply_box.find('input'),
            verify = reply_box.find('.verify-input'),
            notice = reply_box.find('.notice'),
            v = input.val(),
            verify_code = verify.length ? verify.val() : '',
            l = len(v)
            

            if ($.trim(v) == '') {
                notice.text(_.rules.empty)._shakeElem()
                input.focus()
                o.data('lock', false)
                return false
            }

            if (l > _.rules.comment_max[0]) {
                notice.text(_.rules.comment_max[1])._shakeElem()
                input.focus()
                o.data('lock', false)
                return false
            }

            if (l < _.rules.comment_min[0]) {
                notice.text(_.rules.comment_min[1])._shakeElem()
                input.focus()
                o.data('lock', false)
                return false
            }

            if (verify.length && verify_code.length < 1) {
                notice.text(_.rules.verify_err)._shakeElem()
                verify.focus()
                o.data('lock', false)
                return false
            } 


            _.hiddens.content.val(v)
            _.hiddens.fid.val(fid)
            _.hiddens.checkcode.val(verify_code)
            _.form.submit()

            // 判断是否要跳到第一页
            reply_box.data('has-origin')
                && (current_page = 1)

            listenAPI(function(_data) {
                o.data('lock', false)
                if (_data.err) {
                    alert(_data.msg)
                } else {
                    var key = 'position-'+ _data.msg
                    
                    _.getList(current_page, function() {
                        _.hiddens.content.val('')
                        _.hiddens.checkcode.val('')
                        _.hiddens.fid.val(0)
                        window.location.hash = key
                    })
                }
            })
            return false
        })

        // 提交评论
        box.on('click', '.comment-submit', function(e) {

            var o = $(this)
            if (o.data('lock')) return false
            o.data('lock', true)

            var 
            thisbox = box.find('.honey-comment-text'),
            content = thisbox.find('textarea'),
            notice = thisbox.find('.notice'),
            verify = thisbox.find('.verify-input'),
            verify_code = verify.length ? verify.val() : '',
            v = content.val(),
            l = len(v)

            if ($.trim(v) == '') {
                notice.text(_.rules.empty)._shakeElem()
                content.focus()
                o.data('lock', false)
                return false
            }
            
            if (l > _.rules.comment_max[0]) {
                notice.text(_.rules.comment_max[1])._shakeElem()
                content.focus()
                o.data('lock', false)
                return false
            }

            if (l < _.rules.comment_min[0]) {
                notice.text(_.rules.comment_min[1])._shakeElem()
                content.focus()
                o.data('lock', false)
                return false
            }

            if (verify.length && verify_code.length < 1) {
                notice.text(_.rules.verify_err)._shakeElem()
                verify.focus()
                o.data('lock', false)
                return false
            } 
            
            _.hiddens.content.val(v)
            _.hiddens.checkcode.val(verify_code)
            _.form.submit()

            listenAPI(function(_data) {
                var state = _data.err ? 'error' : 'success'
                notice.addClass(state).html(_.rules[state]).show()
                if (_data.err) {
                    notice.html('<i></i> '+ _data.msg)
                    setTimeout(function() {
                        notice.fadeOut(500)
                        notice.removeClass(state)
                    }, 1000)
                } else {
                    content.val('')
                    verify.val('')
                    _.hiddens.checkcode.val('')
                    _.hiddens.mood.val(0)
                    setTimeout(function() {
                        notice.fadeOut(500)
                        notice.removeClass(state)
                        _.getList(1)
                    }, 1000)
                }
                box.find('.verify-img').trigger('click')
                o.data('lock', false)
            }) 
            return false
        })

        // 登录
        box.on('click', '.submit', function(e) {
            var 
            btn = $(this),
            form = $('#'+ btn.val()).find('form'),
            email = form.find('.honey-comment-email'),
            pass = form.find('.honey-comment-pass'),
            passv = pass.val()
            
            if ($.trim(email) == '') {
                alert('邮箱不能为空')
                return false
            }
             
            if ($.trim(passv) == '') {
                alert('密码不能为空')
                return false
            }

            pass.val(honey.encodePassword(passv))
            form.submit()
            return false
        })

        // 如果有公共登录框
        H.loginDialog && box.on('click', 'textarea.no-login', H.loginDialog)

        // 顶一条评论
        box.on('click', '.up-comment', function(e) {
            var 
            o = $(this),
            id = o.attr('href').split('#')[1]

            if (o.data('lock')) return false
            o.data('lock', true)
            
            _.uphiddens.comment_id.val(id)
            _.upform.submit()
            listenAPI(function(_data) {
                if (_data.err) {
                    alert(_data.msg)
                } else {
                    _.uphiddens.comment_id.val(0)
                    o.find('strong').html('[ '+ _data.msg +' ]')
                    window.location.hash = 'position-'+ id
                }
            })
            
            return false
        })
        
        // 监听iframe返回
        var count = 1
        function listenAPI(_fn) {
            _.timer = setInterval(function() {
                var 
                href = window.location.href
                hash = href.split('#')[1]
                hash = decodeURIComponent(hash)
                if (hash && hash.indexOf('err') > 0) {
                    clearInterval(_.timer) 
                    _.timer = null
                    window.location.hash = 'comment--'
                    hash = $.parseJSON(hash)
                    count = 1
                    _fn(hash)
                    return 
                }
                count ++
                if (count > 50) {
                    clearInterval(_.timer) 
                    _.timer = null
                    count = 1
                    alert('timeout')
                }
            }, 200)
        }
    }

    //var page = 1
    comment.prototype.getList = function(_page, _fn) {
        var 
        _ = this,
        method = methods[_.project],
        url = api +'/comment/'+ method +'/?callback=?'
        
        if (_.nolist) {
            $.getJSON(url, {
                type: _.type,
                subject_id: _.subject,
                page: _page
            }, function(_data) {
                //_.box.find('.comments-total-nums').html(_data.total_number)
                total_num_box.html(_data.total_number)
            });
            return
        }

        current_page = _page
        _.listbox.empty().css('opacity', '0.5')
        $.getJSON(url, {
            type: _.type,
            subject_id: _.subject,
            page: _page
        }, function(_data) {

            if (_data.err) {
                _.listbox.html(_data.msg).show();
                return
            }
            var comments = _data.comments
            total_number = _data.total_number
            no = total_number - (_page * page_number)
            if (no < 0) no = 0

            if (!comments || !comments.length) {
                total_number = 0
                comments = []
            }
            
            //_.box.find('.comments-total-nums').html(total_number)
            total_num_box.html(_data.total_number)

            var count_hot = 0
            if (_.project === 'enthunantv' && _page === 1) {
                var hot_comments = comments.slice(0, 3)
                while (hot_comments.length) {
                    var comment = hot_comments.shift()
                    if (~~comment[0].up_num > 0) {
                        count_hot ++
                    }
                }
            } else {
                count_hot = 0
                $('.bluebox-style').remove()
            }
            
            if (count_hot) {
                hot_comments = comments.splice(0, count_hot)
                 
                var blue_box = $('.bluebox-style')
                if (!blue_box.length) {
                    _.listbox = _.listbox.clone().insertBefore(_.listbox)    
                    _.listbox.addClass('bluebox-style')
                } else {
                    _.listbox = blue_box
                }
                _.listbox.empty()
                while (hot_comments.length)
                    _.renderItem(hot_comments.pop())
               
                _.listbox.prepend('<li class="clearfix"><h4>热门评论</h4></li>')
                _.listbox.animate({opacity: 1}, 500)
                _.listbox = _.listbox.next('.honey-comment-list')
            }

            while (comments.length)
                _.renderItem(comments.pop())
            _.listbox.animate({opacity: 1}, 500)
            _.buildPages(total_number)
            if (_page > 1)
                window.location.hash = _page
            _fn && _fn()
        })

    }
    
    comment.prototype.buildPages = function(_total) {

        var 
        box = this.box.find('.honey-comment-pages'),
        max_page = Math.ceil(_total / page_number),
        tpl = this.tpl.pageList,
        page_len = 5,
        middle_page = Math.ceil(page_len / 2),
        current = function() {
            return this == current_page
        },
        pages = []

        if (max_page < 2) return
        var min = current_page - (middle_page - 1) > 0
            ? current_page - (middle_page - 1)
            : 1
        var max = min + page_len > max_page
            ? max_page + 1
            : min + page_len
        if (max - min < page_len) {
            min = max - 5 < 1
                ? 1 
                : max - 5
        }
        for (var i = min; i < max; i ++) {
            pages.push(i)
        }

        //if (max_page - max > 1) {
        //    
        //}
        var data = {
            first: 1 < min ? 1 : 0,
            prev: (current_page - 1 < 1) ? 1 : (current_page - 1),
            pages: pages,
            current: current,
            next: (current_page + 1 > max_page) ? max_page : (current_page + 1),
            end: max < max_page ? max_page : 0,
            more_next: max_page - max > 0,
            more_prev: min - 1 > 1
        },
        html = Mustache.render(tpl, data)
        
        box.html(html)
        
    }
    comment.prototype.buildActions = function() {
        var 
        _ = this,
        tpl = _.tpl.actions,
        tpl_nologin = _.tpl.actions_nologin,
        box = _.box.find('.honey-comment-text'),
        url = api +'/user?callback=?'
        
        $.getJSON(url, function(_data) {
            _data.mood = _.hasmood
            var html = (~~_data.login)
                ? (current_user = _data.user,
                    need_verify = _data.is_code,
                    Mustache.render(tpl, _data))
                : Mustache.render(tpl_nologin, _data)
            box.html(html)
        })
    }
    
    comment.prototype.renderItem = function(_item) {
        var item = {}
        if ($.isArray(_item)) {
            item.comment = _item.pop()
            item.comments = _item
            $.each(item.comments, function(i, v) {
                v.no = i+1
            })
        } else {
            item = _item
        }
        item.no = ++ no
        item.ie = honey.ie && honey.ie < 7
        var 
        html = Mustache.render(this.tpl.list, item)
        this.listbox.prepend(html)
    }


    $.fn._shakeElem = function() {
        var 
        t, 
        i = 0,
        o = $(this).show(),
        colors = ['#cb4b4b', '#fff']

        !function c() {
            o.css({
                'backgroundColor': colors[i % 2],
                'color': colors[(i + 1) % 2]
            })
            if (i > 6) {
                clearTimeout(t)
                t = null
                o.fadeOut(500)
                return
            }
            i ++
            t = setTimeout(c, 100)
        }()
         
    }
     
    H.comment = comment
})
