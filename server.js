// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'),
    fs = require('fs'),
	url = require('url');

var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

var port     = 8081; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('something is happening..');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
       next();
    }
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/saveResult')

	// post the results to be saved
	.post(function(req, res) {
		
		console.log('req: ' +  req.data);
        var filePath = __dirname + '/results/' + req.body.user + '.txt';

        console.log('file path' + filePath);
        fs.appendFile(filePath, JSON.stringify(req.body));
        res.json({ message: 'Saved the response to the server' });
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port:  ' + port);
