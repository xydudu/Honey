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
        _.id = 'honey-photoview'
        _.slide_id = 'honey-photoview-slide'
        _.template = 'Error:template is empty'
        _.loading_id = 'photo-view-loading'
        
        
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
        },

        makeSlide: function() {
            var _ = this
            return H.slide(_.slide_options)  
        },
        
        loadingShow: function() {
            this.loading = this.loading || this.find('#'+ this.loading_id)
            this.loading.show()
        },
        
        loadingHide: function() {
            this.loading = this.loading || this.find('#'+ this.loading_id)
            this.loading.hide()
        },

        changeCurrent: function(_id) {
            //   
        },

        updateSize: function() {
            //  
        },

        open: function() {
            if (this.rendered) {
                return this.out_box.show()
            }
            this.render()
            this.out_box.show() 
            if (H.slide && this.slide_options) {
                this.slide = this.makeSlide()
            }
        },
        
        close: function() {
            this.out_box.hide() 
        },

        rotateRight: function() {
            if ($.fn.rotate)
                this.getCurrentPhoto().rotateRight() 
            this.updateSize()
        },

        rotateLeft: function() {
            if ($.fn.rotate)
                this.getCurrentPhoto().rotateLeft() 
            this.updateSize()
        }
    }
    
    H.photoview = view 

})
