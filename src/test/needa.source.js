honey.def('mod_a', function(H) {
    H.need_a = 1
    if (!window.a)
        H.need_a = 2

});
