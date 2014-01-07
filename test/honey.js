chai.should();

describe("Honey", function () {

    it("Hello world", function () {
        //honey.should.be.type('object')
        honey.should.have.property('go');
        honey.should.have.property('ready');
        honey.should.have.property('def');
        honey.should.have.property('config');
    });

    describe('配置项:传入项目名', function() {
        before(function(){
            honey.config('i.hunantv')
        }) 
        it("自动取得相关配置", function() {

        });
    })
    

    //it("引入一个文件", function(done) {
    //    //honey.go('') 
    //});

});
