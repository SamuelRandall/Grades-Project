var assert = require("assert");
var gradeDecoder = require("../lib/gradeDecoder");
var fs = require('fs');

describe('easygrades', function () {
  describe('gradeDecoder', function () {

    it('it should return a decoded string', function () {
      var encodedstring = "Zm9vYmFy";
      var decoder = new gradeDecoder();
      assert.equal(decoder.decode(encodedstring), 'foobar');
    });

    it('it should parse the HTML table and return an array of grades', function () {
      var decoder = new gradeDecoder();
      fs.readFile(__dirname + '/mocks/gradeTable.html', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        var grades = decoder.parseHtml(data)
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
    });

  });
});

