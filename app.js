var tessel = require('tessel');
var http = require('http');
var https = require('https');

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

var server = http.createServer(function (req, res) {

	console.log('http get...');
	https.get("blockchain.info/address/1BvrLsy4k4q9puCuiTagnBE3SuRNC4nLzK?format=json", function(res) {
	  console.log(res.statusCode);
	  if (res.statusCode == 200) {
	    var body = '';

	    res.on('data', function(chunk) {
	      body += chunk;
	      console.log(body);
	    });

	    res.on('end', function() {
	      console.log('got end');

	      setInterval(function() {
			console.log("I'm blinking! (Press CTRL+ C to stop)");
			led1.toggle();
			led2.toggle();

			}, 300);

	    });
	  } else {
	    console.log(res.statusCode);
	  }
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
});

server.listen(8080);
console.log('Server is listening');