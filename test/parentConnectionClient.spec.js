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
              assert.equal(client.sessionID, 'lsakedyxcp2rbywzlfs24h4k');
            });
        });
    });
    describe('login', function(){
        var scope = nock('https://gradespeed.nisd.net')
            .post('/pc/default.aspx?DistrictID=15915')
            .reply(302)
            .post('/pc/default.aspx?DistrictID=15915')
            .reply(200);
        it('should set isLoggedIn to true for 302 response', function(){
            var client = new parentConnectionClient();
            client.login("username", "password", function(){
                assert.equal(client.isLoggedIn, true);
            });
        });
        it('should set isLoggedIn to false for 200 response', function(){
            var client = new parentConnectionClient();
            client.login("username", "password", function(){
                assert.equal(client.isLoggedIn, false);
            });
        });
    });
    describe('getGrades', function(){
        var scope = nock('https://gradespeed.nisd.net')
            .get('/pc/ParentStudentGrades.aspx')
            .replyWithFile(200, __dirname + '/mocks/ParentStudentGrades.aspx', {"Set-Cookie": "ASP.NET_SessionId=lsakedyxcp2rbywzlfs24h4k; path=/; HttpOnly"});
        it('should get grades and add objects to grades array', function(){
            var client = new parentConnectionClient();
            client.isLoggedIn = true;
            var result = client.getGrades(function(){
                var grades = client.grades;
                assert.equal(grades[0].teacher, 'Copeland, Joshua');
                assert.equal(grades[0].course, 'US Hist AP D E');
                assert.equal(grades[0].period, '01');
                assert.equal(grades[0].cycle1, '97');
                assert.equal(grades[0].cycle2, '93');
                assert.equal(grades[0].cycle3, '95');
                assert.equal(grades[0].exam1, '74');
                assert.equal(grades[0].sem1, '91');
                assert.equal(grades[0].cycle4, '92');
                assert.equal(grades[0].cycle5, '');
                assert.equal(grades[0].cycle6, '');
                assert.equal(grades[0].exam2, '');
                assert.equal(grades[0].sem2, '92');
                assert.equal(grades.length, 9);
            });
            assert.equal(result, true);
        });
    });
});

