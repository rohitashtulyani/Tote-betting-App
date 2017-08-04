// middleware - error handler
module.exports = function(err, req, res, next) {
	console.error("err  is :: ", err);
	res.render('error', {
		title : "Error Page",
		raceId : req.raceId,
		errors : err.stack
	});
}
