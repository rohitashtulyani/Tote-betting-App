// middleware - error handler - for showing simialr error format
module.exports = function(err, req, res, next) {
	if(!(err instanceof Array)){
		// handle application error
		res.render('error', {
			raceId : req.raceId,
			errors : err
		});
	} else{
		// handle validation errors
		var splitedRoute = req.route.path.split("/");
		var route = splitedRoute[splitedRoute.length - 1];
		res.render(route, {
			raceId : req.raceId,
			errors : err
		});
	}
}
