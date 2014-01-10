chai.should();


describe("Honey debug 模块", function () {

    beforeEach(function(done) {
        honey.config({
            'PROJECT': 'honey.dev',
            'ROOT': 'http://honey.hunantv.com/honey-2.0/',
            'PUBROOT': 'http://honey.hunantv.com/honey-2.0/',
            'DEV': false,
            'VERSION': '20140110'
        })

        honey.go('lib:jquery, lib:debug', done)
    })

    it("初始化", function () {
        honey.debug.should.be.ok
    });

    it("honey.debug 打印字符串", function() {
        honey.debug('test string')
        var text = $('#honey-debug span.console').html()
        text.should.equal('test string')
    })
})


