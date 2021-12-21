/* If there is an error then script will not run, change title and icon*/
/* <link rel="icon" type="image/png" href="https://upload.wikimedia.org/wikipedia/commons/2/25/Google_Classroom_icon.svg" sizes="32x32">*/

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
	/*alert(getRandomInt(7));*/
	var added = "div -> h1";
	alert("Running...[" + added + "]")
  	var url = window.location.href
	document.title = "Classes";
     	var link = document.querySelector("link[rel~='icon']");
	if (!link) {
        	link = document.createElement('link');
		link.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(link);
		link.href = 'https://upload.wikimedia.org/wikipedia/commons/2/25/Google_Classroom_icon.svg';
		const text = document.getElementsByClassName('second')[0];
		text.textContent = ":)"
			}
	/*spot */
	try {
	const newDiv = document.createElement("h1");
	const newContent = document.createTextNode("H1 tag");
	newDiv.appendChild(newContent);
	const currentDiv = document.getElementById("div");
	document.body.insertBefore(newDiv, currentDiv);
	aler("ele added"):
	}
	catch(error_bg) { 
	alert("Error: " + error_bg);
	}
	
};
