var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var Bet = require(path.join(__dirname, 'app/bet'));
var Result = require(path.join(__dirname, 'app/result'));

var app = express();

//View 
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use(function(req, res, next){
	res.locals.errors= null;
	next();
})

// Routes
app.get('/bet', function(req, res){
	res.render('bet', {
		title : "Bet"
	});
})

app.post('/bet', function(req, res){
	Bet.make(req.body, function(err, resp){
		return res.render('bet', {
			title : "Bet"
		});
	});
})

app.get('/result', function(req, res){
	res.render('result', {
		title : "Result"
	});
})

app.post('/result', function(req, res){
	Result.publish(req.body, function(err, resp){
		return res.render('result', {
			title : "Result"
		});
	});	
})

app.listen(3000, function(){
	console.log("Server started on port 3000");
})