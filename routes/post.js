
/*
 * GET home page.
 */

var nock = require('nock');
var path = require('path');

var parentConnectionClient = require("../lib/parentConnectionClient");

exports.post = function(req, res){

  var client = new parentConnectionClient();
  client.getSessionID(function(){
    client.login(req.body.username, req.body.password, function(){
      client.getGrades(function(){
        client.logout(function(){
          res.render('grades', { grades: client.grades });
        });
      });
    });
  });


//  var grades = [{
//    teacher: 'Copeland, Joshua',
//  course: 'US Hist AP D E',
//  period: '01',
//  cycle1: '100',
//  cycle2: '100',
//  cycle3: '100',
//  exam1: '100',
//  sem1: '100',
//  cycle4: '100',
//  cycle5: '100',
//  cycle6: '100',
//  exam2: '100',
//  sem2: '100'
//},
//    {
//      teacher: 'Copeland, Joshua',
//      course: 'US Hist AP D E',
//      period: '01',
//      cycle1: '97',
//      cycle2: '93',
//      cycle3: '95',
//      exam1: '74',
//      sem1: '91',
//      cycle4: '92',
//      cycle5: '93',
//      cycle6: '94',
//      exam2: '96',
//      sem2: '99'
//    }];
//
//  res.render('grades', { grades: grades });

};
