/**
 * Created by samuel on 2/23/14.
 */

var https = require('https');

var parentConnectionClient = function () {
  var client = this;
  this.SessionID = "";
  this.getSessionID = function (callback) {

    return https.get('https://gradespeed.nisd.net/pc/default.aspx?DistrictID=15915', function (res) {
      res.on('data', function (d) {
        var sessionCookie = res.headers['set-cookie'].split('; ');
        var sessionId = sessionCookie[0].split('=');
        client.SessionID = sessionId[1];
        callback();
      });
    });

  };
};

module.exports = parentConnectionClient;
