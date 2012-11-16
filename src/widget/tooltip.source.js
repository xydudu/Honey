// tooltips everywhere
// Lian Hsueh 11.13/2012


honey.def('mod_dialog', function(H) {
    
    H.css(CSS +'/widget/tooltip.css')
    if (honey.ie && honey.ie < 9) {
        H.css(CSS +'/widget/tooltip.ie.css')
    }
    var 
    trigger = $('.honey-tooltip')
    //if (!trigger.length) return

    var
    id = 'honey-tooltip-dialog',
    width = 240,
    height = 125,
    html = [
        '<div class="mod-dialog pr" id="'+ id +'">',
            '<div class="black pa"></div>',
            '<div class="dialog-wrap honey-dialog-conBox">',
            '</div>',
        '</div>'
    ].join(''),
    con_html = [
        '<div class="honey-tooltip-content">what..</div>'    
    ].join(''),
    dialog = new H.dialog({
        fixed: false,
        disableBgClick: true,
        needBG: false,
        id: id,
        html: html,
        content: con_html,
        height: 'auto',
        //position: [pos.top + 30, 0, '', pos.left + 10],
        width: width
    }),
    win = $(window),
    win_w = win.width(),
    win_h = win.height();

    var arrow = $('<div />')
        .addClass('honey-tooltip-arrow')
        .hide()
        .appendTo('body')

    var t, lock = false
    
    trigger
    .mouseenter(function() {
        win_h += win.scrollTop()
        var 
        a = $(this),
        pos = a.position(),
        left = (pos.left + width) > win_w ? (win_w - width - 20) : pos.left,
        top = (pos.top + height) > win_h ? (win_h - height - 45) : pos.top + 30

        console.log((pos.top + height),  win_h)
        
        
        dialog.settings.position = [top, 0, '', left]
        clearTimeout(t)
        t = setTimeout(function() {
            dialog.open() 
            var 
            box = $('#'+ id),
            _pos = box.position(),
            _h = box.height()

            _pos.left = pos.left + 20
            if (pos.top + height > win_h) {
                arrow.addClass('bottom')
                _pos.top += _h 
            } else {
                _pos.top -= 16
                arrow.removeClass('bottom')
            }
            arrow.css(_pos).show()

            dialog.box
                .mouseenter(function() {
                    lock = true
                })
                .mouseleave(function() {
                    lock = false
                })    

        }, 500)

    })
    .mouseleave(function dismiss() {
        clearTimeout(t)
        t = setTimeout(function() {
            if (lock) {
                setTimeout(dismiss, 500) 
                return
            }
            dialog.destroy() 
            arrow.hide()
        }, 500)
    })

    
        
    
});
