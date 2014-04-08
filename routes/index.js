
/*
 * GET home page.
 */

exports.index = function(req, res){

  res.render('index', { title: 'Grades', message:'Get your Grades' });


};
