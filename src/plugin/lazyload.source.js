HN.lazyload = function() { //延时加载图片
    $.each($('.hn-lazy'), function(index, item) {
        var img = new Image(), _item = $(item), _src = _item.attr('rel');
        img.src = _src;
        img.complete ? _item.attr('src', _src).hide().fadeIn() : img.onload = function() {
            _item.attr('src', _src).hide().fadeIn();
            img.onload = null;
        };
    });
}
