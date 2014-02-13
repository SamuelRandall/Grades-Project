var assert = require("assert");
var gradeDecoder = require("../lib/gradeDecoder");
describe('easygrades', function(){
    describe('gradeDecoder', function(){
        it('it should return a decoded string', function(){
            var encodedstring = '';
            var decoder = new gradeDecoder();
            assert.equal('foobar', decoder.decode(encodedstring));
        })
    })
})

