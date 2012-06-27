(function() {

  module("Honey 基础");

  test("Honey 命名空间", function() {
    equal(typeof Honey, 'function', "Honey");
    equal(typeof honey, 'function', "honey");
    equal(typeof H, 'function', "H");
    return equal(typeof HN, 'function', "HN");
  });

  test("Honey APIs", function() {
    equal(typeof Honey.go, 'function', "go");
    equal(typeof Honey.ready, 'function', "ready");
    return equal(typeof Honey.def, 'function', "def");
  });

  module("Loader");

  test('加载1个模块', 6, function() {
    stop();
    H.ready("mod_test", function() {
      equal(mod_test, 1, 'mod_test ready');
      return ok(true, "H.ready before");
    });
    H.go("mod_test", function() {
      return equal(mod_test, 1, 'mod_test go');
    });
    H.go("mod_test2", function() {
      return equal(mod_test2, 2, 'mod_test2 go');
    });
    H.ready("mod_test2", function() {
      equal(mod_test2, 2, 'mod_test2');
      return ok(true, "H.ready after");
    });
    return setTimeout((function() {
      return start();
    }), 2000);
  });

  test('只加载无函数', function() {
    stop();
    H.go("mod_test");
    ok(true, "H.go ok");
    return setTimeout((function() {
      return start();
    }), 2000);
  });

  test('加载2个模块', 7, function() {
    stop();
    H.ready("mod_test2", function() {
      equal(mod_test2, 2, 'mod_test2 == 2');
      return ok(true, "H.ready before");
    });
    H.go("mod_test, mod_test2", function() {
      equal(mod_test, 1, 'mod_test == 1 from H.go');
      return equal(mod_test2, 2, 'mod_test2 == 2 from H.go');
    });
    H.ready("mod_test2", function() {
      equal(mod_test, 1, 'mod_test');
      equal(mod_test2, 2, 'mod_test2 == 2 from H.ready');
      return ok(true, "H.ready after");
    });
    return setTimeout((function() {
      return start();
    }), 2000);
  });

  test('重复加载同一模块', function() {
    stop();
    H.go("mod_test, mod_test", function() {
      return equal(mod_test, 1, 'mod_test == 1 from H.go');
    });
    H.go("mod_test, mod_test, mod_test2", function() {
      return equal(mod_test, 1, 'mod_test == 1 from H.go');
    });
    return setTimeout((function() {
      return start();
    }), 2000);
  });

  test('依赖关系加载', 3, function() {
    stop();
    H.ready("mod_test", function() {
      return equal(mod_test, 1, 'mod_test == 1 from H.go');
    });
    H.go("mod_test2, mod_test", function() {
      return equal(mod_test2, 2, 'mod_test2 == 2 from H.go');
    });
    H.go("mod_test, mod_needa, mod_a", function() {
      return equal(H.need_a, 1, 'H.need_a === 1');
    });
    return setTimeout((function() {
      return start();
    }), 2000);
  });

}).call(this);
