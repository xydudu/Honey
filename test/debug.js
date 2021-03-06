chai.should();

describe("Honey debug 模块", function () {
    before(function(done) {
        window.location.hash = '#debug'
        honey.config({
            'PUBROOT': 'http://honey.hunantv.com/honey/src', 
            'ROOT': 'http://honey.hunantv.com/honey/src', 
            'DEV': true,
            'VERSION': 1,
            'CSS': 'http://honey.hunantv.com/css'
        })
        honey.go('lib:jquery, lib:debug', done)
    })

    it("初始化", function () {
        honey.debug("test")
        $('#hd_panel').length.should.equal(1)
    });

    it("honey.debug 打印字符串", function() {
        var expect = 'test string'
        honey.debug(expect)
        var result = $('.hdp_item').last().children('em').text()
        result.should.equal(expect)
    })

    it("honey.debug null undefined", function() {
        var expect;
        honey.debug(expect)
        var result = $('.hdp_item').last().children('em').text()
        result.should.equal('undefined')
        expect = null
        honey.debug(expect)
        var result = $('.hdp_item').last().children('em').text()
        result.should.equal('null')
    })
})


