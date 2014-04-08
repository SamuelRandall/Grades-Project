/**
 * Created by samuel on 2/23/14.
 */

var https = require('https');
var querystring = require('querystring');
var cheerio = require('cheerio');
var gradeDecoder = require('./gradeDecoder');

var parentConnectionClient = function () {
    var client = this;
    this.sessionID = "";
    this.isLoggedIn = false;
    this.grades = [];
    this.getSessionID = function (callback) {
        return https.get('https://gradespeed.nisd.net/pc/default.aspx?DistrictID=15915', function (res) {
            res.on('data', function (d) {
                var sessionCookie = res.headers['set-cookie'][0].split('; ');
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
                'Cookie': 'ASP.NET_SessionId=' + client.sessionID,
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
    this.getGrades = function (callback) {
        if(this.isLoggedIn == false){
            return false;
        }
        var options = {
            hostname: 'gradespeed.nisd.net',
            port: 443,
            path: '/pc/ParentStudentGrades.aspx',
            method: 'GET',
            headers: {
                'Cookie': 'ASP.NET_SessionId=' + client.sessionID
            }
        };
        var req = https.request(options, function (res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                if (res.statusCode == 200) {
                    $ = cheerio.load(body);
                    var gradesScript = $('.MainContentLeft script').text();
                    var patt = new RegExp("(var\ )([a-zA-Z0-9])+(\;)");
                    var variableName = patt.exec(gradesScript);
                    variableName = variableName[0];
                    variableName = variableName.replace("var ","");
                    variableName = variableName.replace(";","");
                    gradesScript = gradesScript.replace("document.write(decodeString("+variableName+"));", "");
                    gradesScript = eval(gradesScript);
                    var decoder = new gradeDecoder();
                    gradesScript = decoder.decode(gradesScript);
                    client.grades = decoder.parseHtml(gradesScript);
                }
                callback();
            });
        });
        req.end();
        return true;
    };
    this.logout = function (callback) {
      if(this.isLoggedIn == false){
        return false;
      }
      var options = {
        hostname: 'gradespeed.nisd.net',
        port: 443,
        path: '/pc/Logout.aspx',
        method: 'GET',
        headers: {
          'Cookie': 'ASP.NET_SessionId=' + client.sessionID
        }
      };
      var req = https.request(options, function (res) {
        res.on('data', function (d) {
          callback();
        });
      });
      req.end();
    };
};

module.exports = parentConnectionClient;
