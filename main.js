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
	
	const file = document.body;
	
	const change = /<body>/i;
	
	document.write(file.replace(change, '<body style="background-color: black">'););
};
