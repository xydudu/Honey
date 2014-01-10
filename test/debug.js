chai.should();


describe("Honey debug 模块", function () {

    beforeEach(function(done) {
        honey.config({
            'PROJECT': 'honey.dev',
            'ROOT': 'http://honey.com/src/',
            'PUBROOT': 'http://honey.com/src/',
            'DEV': true,
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


