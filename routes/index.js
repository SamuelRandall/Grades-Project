
/*
 * GET home page.
 */

exports.index = function(req, res){
  var options = {
    hostname: 'github.com',
    port: 443,
    path: '/winmillwill/kraftwagen/commit/d0a5a3b5033e54d13fbb7b1f486b6f6e51cf1f0c.patch',
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();

  res.render('index', { title: 'Grades', message:'Get your Grades' });
};
