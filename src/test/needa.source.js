honey.def('test_a', function(H) {
    H.need_a = 1
    if (!window.a)
        H.need_a = 2

    console.log(H.need_a)

});
