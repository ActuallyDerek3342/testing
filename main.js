/* If there is an error then script will not run*/

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

window.win = function() {
	alert("!");
	document.title = ">";
	sleep(1000);
	document.title = "=>";
	sleep(1000);
	document.title = "==>";
	sleep(1000);
	document.title = "===>";
	sleep(1000);
	document.title = "====";
	sleep(1000);
	document.title = " ===";
	sleep(1000);
	document.title = "  ==";
	sleep(1000);
	document.title = "   =";
	sleep(1000);
	document.title = "    ";
	
	const http = require('http');

	const hostname = '127.0.0.1';
	const port = 3000;

	const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/html');
	  res.end('<h1>Hello, World!</h1> \n');
	});

	server.listen(port, hostname, () => {
	  console.log(`Server running at http://${hostname}:${port}/`);
	});
};
