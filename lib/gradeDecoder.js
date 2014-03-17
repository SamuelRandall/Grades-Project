/**
 * Created by samuel on 2/12/14.
 */

var cheerio = require('cheerio');

var gradeDecoder = function () {
    this.decode = function(input) {
        return new Buffer(input, 'base64').toString('ascii');
    };

  this.parseHtml = function (html) {
    var grades = [];
    $ = cheerio.load(html);
    $('tr.DataRow, tr.DataRowAlt').each(function(i, elem) {
      var columns = $(this).find('td');
      grades.push({
        "teacher" : $(this).find('.EmailLink').text(),
        "course" : columns.eq(0).text(),
        "period" : columns.eq(1).text(),
        "cycle1" : columns.eq(2).find('span, a').text(),
        "cycle2" : columns.eq(3).find('span, a').text(),
        "cycle3" : columns.eq(4).find('span, a').text(),
        "exam1" : columns.eq(5).find('span, a').text(),
        "sem1" : columns.eq(6).find('span, a').text(),
        "cycle4" : columns.eq(7).find('span, a').text(),
        "cycle5" : columns.eq(8).find('span, a').text(),
        "cycle6" : columns.eq(9).find('span, a').text(),
        "exam2" : columns.eq(10).find('span, a').text(),
        "sem2" : columns.eq(11).find('span, a').text()
      });
    });
    return grades;
  };
};

module.exports = gradeDecoder;
