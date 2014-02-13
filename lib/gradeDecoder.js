/**
 * Created by samuel on 2/12/14.
 */
var gradeDecoder = function () {
    this.decode = function(input) {
        return new Buffer(input, 'base64').toString('ascii');
    };
};

module.exports = gradeDecoder;