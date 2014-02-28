/**
 * Created by samuel on 2/23/14.
 */

var https = require('https');
var querystring = require('querystring');

var parentConnectionClient = function () {
    var client = this;
    this.sessionID = "";
    this.isLoggedIn = false;
    this.getSessionID = function (callback) {

        return https.get('https://gradespeed.nisd.net/pc/default.aspx?DistrictID=15915', function (res) {
            res.on('data', function (d) {
                var sessionCookie = res.headers['set-cookie'].split('; ');
                var sessionId = sessionCookie[0].split('=');
                client.sessionID = sessionId[1];
                callback();
            });
        });
    };
    this.login = function (username, password, callback) {
        var post_data = querystring.stringify({
            'txtUserName': username,
            'txtPassword': password
        });
        var options = {
            hostname: 'gradespeed.nisd.net',
            port: 443,
            path: '/pc/default.aspx?DistrictID=15915',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length
            }
        };
        var req = https.request(options, function (res) {
            res.on('data', function (d) {
                if (res.statusCode == 302) {
                    client.isLoggedIn = true;
                }
                callback();
            });
        });
        req.write(post_data);
        req.end();
    };
};

module.exports = parentConnectionClient;
