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
	document.title = "LOL";
	sleep(1000);
	document.title = "this";
	sleep(1000);
	document.title = "is";
	sleep(1000);
	document.title = "cool";
	const browseFiles = () => {
	  var input = document.createElement('input');
	  input.type = 'file';
	  input.click();
	}
};
