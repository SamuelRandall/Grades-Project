/**
 * Created by samuel on 2/23/14.
 */

var parentConnectionClient = function () {
    this.decode = function(input) {
        return new Buffer(input, 'base64').toString('ascii');
    };
};

module.exports = parentConnectionClient;
