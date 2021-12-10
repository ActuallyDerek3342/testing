
window.win = function() {
	alert("Running script...");
	const REQUEST = require('request'); // https://www.npmjs.com/package/request
	var options = {
	 // The URL of the site you want to send a request to.
	 // The site below simply prints the IP you are coming from.
	 url: 'https://www.ipchicken.com',
	 // The IP and Port of the proxy you want to send
	 // your request through. Below is one which worked
	 // initially that I retrieved from the API.
	 proxy: 'http://51.158.68.133:8811'
	}
	REQUEST(options, function (error, response, body) {
	   //If the Proxy worked we'll see the IP of the proxy returned
	   console.log(body);
	});
};
