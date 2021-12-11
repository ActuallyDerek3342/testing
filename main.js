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
	alert(getRandomInt(7));
	document.title = ":)";
	
	document.getElementByClassName("YVvGBb z3vRcc-ZoZQ1").innerHTML = "change";
	
};
