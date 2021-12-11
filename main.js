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
	
	window.open("index.html");
};
