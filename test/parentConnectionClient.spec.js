/**
 * Created by samuel on 2/23/14.
 */
var nock = require('nock');
var assert = require("assert");
var parentConnectionClient = require("../lib/parentConnectionClient");
describe('parentConnectionClient', function(){
    describe('sessionID', function(){
        it('should store session id after first GET request', function(){
            var scope = nock('https://gradespeed.nisd.net')
                .get('/pc/default.aspx?DistrictID=15915')
                .replyWithFile(200, __dirname + '/mocks/getSessionIDResponse', {"Set-Cookie": "ASP.NET_SessionId=lsakedyxcp2rbywzlfs24h4k; path=/; HttpOnly"});
            var client = new parentConnectionClient();
            client.getSessionID(function(){
              assert.equal('lsakedyxcp2rbywzlfs24h4k', client.SessionID);
            });
        });
    });
});

