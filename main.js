/* If there is an error then script will not run*/

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

window.win = function() {
	alert(Math.random(88));
	document.title = ":)";
	
	/*const p = document.body;

	console.log(p.replace('<body>', '<body style="background-color:red">'));*/
	
	try {
		let text = document.body;
		let result = text.replace("<body>", "<body style='background-color:red'>");
	};
	catch(err) {
	  alert("Failed");
	};
};
