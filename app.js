'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var betRouter = require('./routes/bet');
var resultRouter = require('./routes/result');
var dividendRouter = require('./routes/dividend');
var raceRouter = require('./routes/race');
var errorHandler = require('./middlewares/error-handler');

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

// Routers
app.use('', raceRouter);
app.use('', betRouter);
app.use('', resultRouter);
app.use('', dividendRouter);

app.use(errorHandler);

app.listen(3000, function(){
	console.log("Server started on port 3000");
})