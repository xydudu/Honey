module "Honey 基础"

test "Honey 命名空间", ()->
  equal typeof Honey, 'function', "Honey"
  equal typeof honey, 'function', "honey"
  equal typeof H, 'function', "H"
  equal typeof HN, 'function', "HN"

test "Honey APIs", ()->
  equal typeof Honey.go, 'function', "go"
  equal typeof Honey.ready, 'function', "ready"
  equal typeof Honey.def, 'function', "def"



module("Loader")

test '加载1个模块', 6, ()->
    stop()
    H.ready "test_test", ()->
        equal mod_test, 1, 'mod_test ready'
        ok true, "H.ready before"
    
    H.go "test_test", ()->
        equal mod_test, 1, 'mod_test go'

    H.go "test_test2", ()->
        equal mod_test2, 2, 'mod_test2 go'

    H.ready "test_test2", ()->
        equal mod_test2, 2, 'mod_test2'
        ok true, "H.ready after"

    setTimeout (-> start()), 2000

test '只加载无函数', ()->
    stop()
    H.go "test_test"
    ok true, "H.go ok"
    setTimeout (-> start()), 2000

test '加载2个模块', 7, ()->
    
    stop()
    H.ready "test_test2", ()->
        equal mod_test2, 2, 'mod_test2 == 2'
        ok true, "H.ready before"
    
    H.go "test_test, test_test2", ()->
        equal mod_test, 1, 'mod_test == 1 from H.go'
        equal mod_test2, 2, 'mod_test2 == 2 from H.go'
    
    H.ready "test_test2", ()->
        equal mod_test, 1, 'mod_test'
        equal mod_test2, 2, 'mod_test2 == 2 from H.ready'
        ok true, "H.ready after"

    setTimeout (-> start()), 2000

test '重复加载同一模块', ()->
    stop()
    H.go "test_test, test_test", ()->
        equal mod_test, 1, 'mod_test == 1 from H.go'

    H.go "test_test, test_test, test_test2", ()->
        equal mod_test, 1, 'mod_test == 1 from H.go'

    setTimeout (-> start()), 2000
        #equal mod_test2, 2, 'mod_test2 == 2 from H.go'

test '依赖关系加载', 3, ()->
    stop()

    #H.go "mod_a, mod_needa", ()->

    H.ready "test_test", ()->
        equal mod_test, 1, 'mod_test == 1 from H.go'

    H.go "test_test2, test_test", ()->
        equal mod_test2, 2, 'mod_test2 == 2 from H.go'

    H.go "test_test, test_needa, test_a", ()->
        equal H.need_a, 1, 'H.need_a === 1'

    setTimeout (-> start()), 2000

test '加载pub路径', 1, ()->
    stop()
    H.go "test_test2, test:test", ()->
        equal mod_test2, 2, 'mod_test2 == 2 from H.go'

    setTimeout (-> start()), 2000

#test 'def依赖的模块没有引入', 1, ()->
#    stop()
#    H.go "mod_test, mod_needa", ()->
#        equal H.need_a, 1, 'H.need_a === 1'
#    setTimeout (-> start()), 2000

