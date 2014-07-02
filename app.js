var tessel = require('tessel');
var http = require('http');

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

	console.log('http get...');

	var resData = '';
	var parsed;
	var initialBalance = undefined;
	var watchBalance = 0;

	// http.get("blockchain.info/address/1BvrLsy4k4q9puCuiTagnBE3SuRNC4nLzK?format=json", function(res) {
setInterval(function(){

	http.get("http://tbtc.blockr.io/api/v1/address/info/n3Q34JHETFFy6xPQHXJh1w7tUoewJCyQZ9", function(res) { //testnet
		  if (res.statusCode == 200) {

		    res.on('data', function(data) {
		      console.log('initial watch: '+ watchBalance + 'initial balance: ' + initialBalance);
		      // resData += data;
		      var parsed = JSON.parse(data);
		      console.log(JSON.stringify(parsed));
		      watchBalance = parsed["data"]["balance"];
		      console.log('assigned watch: '+ watchBalance + 'assigned balance: ' + initialBalance);

		      //runs only in the beginning
		      if (typeof initialBalance === "undefined") {
		      	initialBalance = parsed["data"]["balance"];
		      	console.log(initialBalance);
		      }

		      // if watchBalance is greater than initial
		      if (watchBalance > initialBalance) {
		      	console.log('do something cool!!');
		      	led1.toggle();
				led2.toggle();
		      	clearInterval(interval);
		      }

		    });

		    res.on('end', function() {
		      console.log('got end');
		    });

		  } else {
		    console.log(res.statusCode);
		  }
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		});

}, 20000);