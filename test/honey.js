chai.should();

describe("Honey", function () {

    it("Hello world", function () {
        //honey.should.be.type('object')
        honey.should.have.property('go');
        honey.should.have.property('ready');
        honey.should.have.property('def');
        honey.should.have.property('config');
    });

    describe('配置项:直接传入项目配置文件URL', function() {
        this.timeout(2000)
        it("自动取得相关配置", function(done) {
            var config_url = 'http://honey.hunantv.com/src/configs/config.ihunantv.js' 
            honey.config(config_url, function() {
                PROJECT.should.equal('i.hunantv')
                ROOT.should.equal('http://honey.hunantv.com/i/js')
                done()
            })
        })
    })

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

    

    //it("引入一个文件", function(done) {
    //    //honey.go('') 
    //});

});
