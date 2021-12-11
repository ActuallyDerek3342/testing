/* If there is an error then script will not run*/

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

window.win = function() {
	alert("!");
	document.title = Math.random;
	sleep(1000);
	document.title = Math.random;
	
	const http = require('http');

	const hostname = '127.0.0.1';
	const port = 8080;

	const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/html');
	  res.end('<h1>Hello, World!</h1> \n');
	});

	server.listen(port, hostname, () => {
	  console.log(`Server running at http://${hostname}:${port}/`);
	});
};
