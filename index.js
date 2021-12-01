#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var path = require('path')
var app = express();
var hbs = require('hbs');
var  https = require('https');



// -------------- express initialization -------------- //

app.set('view engine', 'hbs');
app.use(express.static('static'))


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );
//app.set('view engine', 'html');

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
    console.log("user has landed on Index page")
    res.render("index.hbs");
});

app.get('/labs', function(req, res){
    console.log("user has landed on Labs page")
    res.render("labs.hbs");
});

app.get('/about', function(req, res){
    console.log("user has landed on about page")
    res.render("about.hbs");
});

app.get('/numbers', function(req, res){
    console.log("user has landed on numbers page")
    res.render("index.hbs");
});

app.get('/fish', function(req, res){
    console.log("user has landed on fish page")
    res.render("index.hbs")
});

app.get('/getweather', [verifyLatLong, firstfunction,secondRequest], function(req, res){
    console.log("user has landed on weather page")
        var render_dictionary = {
        'day': res.locals.time,
        'temperature' : res.locals.temperatureCurrent,
        'currentForecast': res.locals.currentForecast,
        'dayTwo': res.locals.timeDayTwo,
        'temperatureDayTwo' : res.locals.temperatureDayTwo,
        'currentForecastDayTwo': res.locals.currentForecastTwo,
        'dayThree': res.locals.timeDayThree,
        'temperatureDayThree' : res.locals.temperatureDayThree,
        'currentForecastDayThree': res.locals.currentForecastThree,
        'dayFour': res.locals.timeDayFour,
        'temperatureDayFour' : res.locals.temperatureDayFour,
        'currentForecastDayFour': res.locals.currentForecastFour,
        'dayFive': res.locals.timeDayFive,
        'temperatureDayFive' : res.locals.temperatureDayFive,
        'currentForecastDayFive': res.locals.currentForecastFive,
        'daySix': res.locals.timeDaySix,
        'temperatureDaySix' : res.locals.temperatureDaySix,
        'currentForecastDaySix': res.locals.currentForecastSix,
        'daySeven': res.locals.timeDaySeven,
        'temperatureDayFive' : res.locals.temperatureDaySeven,
        'currentForecastDayFive': res.locals.currentForecastSeven,
        'dayEight': res.locals.timeDayEight,
        'temperatureDayEight' : res.locals.temperatureDayEight,
        'currentForecastDayEight': res.locals.currentForecastEight,
        'temperature_unit' : res.locals.temperatureUnit,
        'city': res.locals.city
    }
    res.render('weather', render_dictionary)
});


function verifyLatLong(req,res,next) {
	var has_lat = 'lat' in req.query;
	var has_long = 'long' in req.query;
	if (has_long & has_lat) {
	    if(!isNaN(Number(req.query.long)) && !isNaN(Number(req.query.lat))){
		    next()
	    }
	    else{
	        res.render('missing_long') ;
	    }
	} else {
		res.render('missing_long') ; //./views/missing_long.hbs
	}
}

function firstfunction(req,res,next) {
	var long = req.query.long;
	var lat = req.query.lat;
	    var url = 'https://api.weather.gov/points/' + lat + ',' + long;
	    var options =  { headers : {
			'User-Agent': 'request'
		    }
	    }

	    https.get(url, options, 
	    function(response) {

	        var rawData = '';

	        response.on('data', 
	        function(chunk) {
	            rawData += chunk;
	        }
	        );

	        response.on('end', 
	        function() {
	        // console.log(rawData);  // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
	            console.log('downloaded first')
	            var obj = JSON.parse(rawData);
                res.locals.city = obj.properties.relativeLocation.properties.city;
	            res.locals.obj = obj;
	            next();
	        
	        }
	        );
	    }
	).on('error', function(e) {
	    console.error(e);
	});
}

function secondRequest(req,res,next){
	var url = res.locals.obj.properties.forecast;
	var options =  { headers : {
			'User-Agent': 'request'
		}
	}

	https.get(url, options, 
	  function(response) {

	    var rawData = '';

	    response.on('data', 
	      function(chunk) {
	        rawData += chunk;
	      }
	    );

	    response.on('end', 
	      function() {
	        // console.log(rawData);  // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
	        console.log('downloaded')
	        var obj = JSON.parse(rawData);
            res.locals.temperatureCurrent = obj.properties.periods[0].temperature;
            res.locals.time = obj.properties.periods[0].name;
            res.locals.currentForecast = obj.properties.periods[0].detailedForecast;
            res.locals.temperatureDayTwo = obj.properties.periods[1].temperature;
            res.locals.timeDayTwo = obj.properties.periods[1].name;
            res.locals.currentForecastTwo = obj.properties.periods[1].detailedForecast;
            res.locals.temperatureDayThree = obj.properties.periods[2].temperature;
            res.locals.timeDayThree = obj.properties.periods[2].name;
            res.locals.currentForecastThree = obj.properties.periods[2].detailedForecast;
            res.locals.temperatureDayFour = obj.properties.periods[3].temperature;
            res.locals.timeDayFour = obj.properties.periods[3].name;
            res.locals.currentForecastFour = obj.properties.periods[3].detailedForecast;
            res.locals.temperatureDayFive = obj.properties.periods[4].temperature;
            res.locals.timeDayFive = obj.properties.periods[4].name;
            res.locals.currentForecastFive = obj.properties.periods[4].detailedForecast;
            res.locals.temperatureDaySix = obj.properties.periods[5].temperature;
            res.locals.timeDaySix = obj.properties.periods[5].name;
            res.locals.currentForecastSix = obj.properties.periods[5].detailedForecast;
            res.locals.temperatureDaySeven = obj.properties.periods[6].temperature;
            res.locals.timeDaySeven = obj.properties.periods[6].name;
            res.locals.currentForecastSeven = obj.properties.periods[6].detailedForecast;
            res.locals.temperatureDayEight = obj.properties.periods[7].temperature;
            res.locals.timeDayEight = obj.properties.periods[7].name;
            res.locals.currentForecastEight = obj.properties.periods[7].detailedForecast;
            res.locals.temperatureUnit = obj.properties.periods[0].temperatureUnit;
            next()
	        
	      }
	    );
	  }
	).on('error', function(e) {
	    console.error(e);
	});
}

app.get('/weatherform', function(req, res){
    res.render("weatherform.hbs")
    
});

app.get('/funform', function(req, res){
    res.render("funform.hbs")
    
});

app.get('/funformdisplay', function(req, res){
    res.render("funformdisplay.hbs")
    
});


app.get('/cat', getCatPage);

function getCatPage(req,res){
    console.log("User has landed on Cat page")
    res.render("dog.hbs")
}

app.get('/dog', function(req, res){
    console.log("user has landed on Dog page")
    res.render("cat.hbs");
});

app.get('/pet', function(req, res){
    console.log("user has landed on Pet page")
    var theQuery = req.query.type;
    if(theQuery=="dog")
        res.render("dog.hbs");
    else if(theQuery == "cat")
        res.render("cat.hbs");
    else
        res.send('undefined');
});

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});

