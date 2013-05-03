/* 
 * The first widget in 2013, must be better.
 * 
 * Author: Lian Hsueh
 * Date: 3.13/2013
 * Description: a widget for photo view in a dialog
 *
 * TODO:
 *  1. widget trigger 
 *  2. dialog ui (need a furtrue for change style?)
 *  3. adapt for Comment widget
 *  4. you know, I really don't know why the designer made UI so different. 
 *  5. test case
 *
 * */

Honey.def('jquery', function(H) {

    var view = function() {
        var _ = this
        _.html = $('html')
        _.id = 'honey-photoview'
        _.slide_id = 'honey-photoview-slide'
        _.template = 'Error:template is empty'
        _.loading_id = 'photo-view-loading'
        _.max_w = 780
        _.max_h = 590
        _.data_is_change = false
        
        
        this.rendered = false

    }
    
    view.prototype = {

        init: function() {
            // 是否应该给最外面的容器加上初始style?
            this.out_box = $('<div />')
            .attr({
                'id': this.id
            }).appendTo('body').hide()
        },

        
        
        _getTemplate: function() {
            var tpl = this.template
            //如果是id则，取页面html
            //如果是传的模板字符串，直接返回
            return /^#[a-zA-Z0-9\_\-]+/.test(tpl)
                ? $(tpl).html()
                : tpl
        },

        setData: function(_data) {
            this.data_is_change = true
            this.data = $.isFunction(_data)
                ? _data()
                : _data
        },

        render: function() {
            var 
            tpl = this._getTemplate(),
            html = Mustache.render(tpl, this.data)
            this.out_box.html(html)
            this.rendered = true
        },

        
        find: function(_selector) {
            return this.out_box.find(_selector) 
        },

        bindEvent: function(_events) {
            var _ = this
            $.each(_events, function(_selector, _fn) {
                _.out_box.on('click', _selector, function() {
                    _fn.call(_)
                    return false
                })
            }) 

            // 未解决
            // IE sp3 以下，window resize 会不停的触发，是否需要解决这个问题？这个版本的IE比例好像不多了
            
            var t//, _t = 0
            $(window).on('resize', function() {
                //var now = new Date().getTime()
                if (t /*|| now - t < 300*/) return
                t = setTimeout(function() {
                    clearTimeout(t)
                    t = null
                    //_t = now
                    //_.updateSize.call(_)
                    _.setBoxSize.call(_, true)
                    //$('body').append('<p> fire resize</p>')
                }, 600)
            })
        },

        makeSlide: function() {
            var _ = this
            return H.slide(_.slide_options)  
        },
        
        loadingShow: function() {
            //this.loading = this.loading || this.find('#'+ this.loading_id)
            //this.loading.show()
            //return this.loading
            return this.find('#'+ this.loading_id).show()

        },
        
        loadingHide: function() {
            //this.loading = this.loading || this.find('#'+ this.loading_id)
            //this.loading.hide()
            //return this.loading
            return this.find('#'+ this.loading_id).hide()
        },

        changeCurrent: function(_id) {

            var _ = this
            _.currentid = _id ? ~~_id : _.data.photos[0].id
            _.data = _.dealData(_.data)

            _.loadingShow()
            var 
            src = _.data.current.big,
            img = new Image,
            photo = _.getCurrentPhoto().hide(),
            current = _.find('#photos-'+ _.currentid)
            
            _.find('.on').removeClass('on')
            current.addClass('on')
            
            _.slide.goTo(current.index())

            img.onload = img.onerror = function() {
                photo.replaceWith($('<img />').attr({
                    id: _.big_photo_id,
                    src: src
                }))   
                _.current_photo_size = {
                    width: this.width,
                    height: this.height,
                    rate: this.width / this.height
                }
                _.updateSize(this)
            }
            img.src = src
        },

        updateSize: function() {
            //  
        },

        setBoxSize: function() {
        
        },

        open: function() {
            //if (this.rendered && !this.data_is_change) {
            //    return this.justShow()
            //}
            this.render()
            this.justShow()
            if (H.slide && this.slide_options) {
                this.slide = this.makeSlide()
            }
        },

        justShow: function() {
            this.out_box.show() 
            this.data_is_change = false
            //$('body', 'html').css('overflow', 'hidden')
            //$('body').attr('scroll', 'no')
            this.html.css("overflow", "hidden");
        },
        
        close: function() {
            this.out_box.hide() 
            //$('body', 'html').css('overflow', 'auto')
            this.html.css("overflow", "auto");
        },

        rotateRight: function() {
            if (!$.fn.rotate) return
            var p = this.getCurrentPhoto().rotateRight() 
            this.updateSize(p)
        },

        rotateLeft: function() {
            if (!$.fn.rotate) return
            p = this.getCurrentPhoto().rotateLeft() 
            this.updateSize(p)
        }
    }
    
    H.photoview = view 

})
