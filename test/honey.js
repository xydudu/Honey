chai.should();

describe("Honey", function () {

    it("Hello world", function () {
        //honey.should.be.type('object')
        honey.should.have.property('go');
        honey.should.have.property('ready');
        honey.should.have.property('def');
        honey.should.have.property('config');
    });

    /*
     * 此功能还需考虑再确定是否需要添加
     * */
    //describe('配置项:直接传入项目配置文件URL', function() {
    //    this.timeout(2000)
    //    it("自动取得相关配置", function(done) {
    //        var config_url = 'http://honey.hunantv.com/src/configs/config.ihunantv.js' 
    //        honey.config(config_url, function() {
    //            PROJECT.should.equal('i.hunantv')
    //            ROOT.should.equal('http://honey.hunantv.com/i/js')
    //            done()
    //        })
    //    })
    //})

    describe('配置项:直接传入配置项', function() {
        it("手动传入单项配置", function() {
            honey.config('PROJECT', 'data.hunantv')
            PROJECT.should.equal('data.hunantv')
        })
        it("手动传入多项配置", function() {
            honey.config({
                'ROOT': 'http://honey.hunantv.com/data/js',
                'PUBROOT': 'http://honey.hunantv.com/honey-2.0/'
            })
            ROOT.should.equal('http://honey.hunantv.com/data/js')
            PUBROOT.should.equal('http://honey.hunantv.com/honey-2.0/')
        })
    })

    
    describe('引入模块', function() {
        before(function() {
            honey.config({
                'PROJECT': 'honey.dev',
                'ROOT': 'http://honey.hunantv.com/honey-2.0/',
                'PUBROOT': 'http://honey.hunantv.com/honey-2.0/',
                'DEV': false,
                'VERSION': '20140110'
            })
        }) 
        it('honey.go 引入单一模块', function(done) {
            honey.go('lib:jquery', function() {
                jQuery.should.be.ok
                jQuery = null
                done()
            })
            honey.go('lib_jquery1101', function() {
                jQuery.should.be.ok
                done()
            })
        })
        it('honey.go 引入多个模块', function(done) {
            honey.go('mod_pusher, mod_dialog', function() {
                honey.pusher.should.be.ok
                honey.dialog.should.be.ok
                done()
            })
        })
         
    })

    describe('ready 模块引入后触发对应绑定方法', function() {
         before(function() {
            honey.config({
                'PROJECT': 'honey.dev',
                'ROOT': 'http://honey.hunantv.com/honey-2.0/',
                'PUBROOT': 'http://honey.hunantv.com/honey-2.0/',
                'DEV': false,
                'VERSION': '20140110'
            })
        })
        it('honey.ready 模块引入后', function(done) {
            honey.ready('lib_jquery1101', function() {
                $.should.be.ok
                done() 
            })
        })
        it('honey.ready 模块引入前', function(done) {
            honey.ready('mod:slide', function() {
                honey.slide.should.be.ok
                done() 
            })
            honey.go('mod:slide')
        })
    })

    describe('功能函数', function() {
        before(function() {
            honey.config({
                'PROJECT': 'honey.dev',
                'ROOT': 'http://honey.hunantv.com/honey-2.0/',
                'PUBROOT': 'http://honey.hunantv.com/honey-2.0/',
                'DEV': false,
                'VERSION': '20140110'
            })
            honey.go('mod:placeholder')
        })
        it('honey.moduleLoaded', function() {
            //honey.
        }) 
    })

});
