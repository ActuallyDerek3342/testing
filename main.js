/* If there is an error then script will not run, change title and icon*/

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
	/*alert(getRandomInt(7));*/
	alert("Running...")
	document.title = "Classes";
	var link = document.querySelector("link[rel~='icon']");
	try { 
		if (!link) {
		    link = document.createElement('link');
		    link.rel = 'icon';
		    document.getElementsByTagName('head')[0].appendChild(link);
		}
		link.href = 'https://upload.wikimedia.org/wikipedia/commons/2/25/Google_Classroom_icon.svg';
	}
	
	catch(error) {
		alert(error);
	}
	
	try {
		var htmlOutput = '<html> <head> <h1><center>[website edit]<center></h1> <br> </head> <body> <b>Titles & Icons:</b> <br> <input id="Website_edit_button" type="submit" name="Website_edit_button" value="enter"/> </body> </html>';
		document.write(htmlOutput);
	}
	
	catch() {
		alert("Failed to write html file");
	}
	
	document.getElementById('Website_edit_button').onclick = function() {
	   alert("button was clicked");
	};


	
};
