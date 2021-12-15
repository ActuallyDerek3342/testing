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
	
	catch(err) {
		alert(err);
	}
  
  try {
  	const text = document.getElementByClass('second');
    text.textContent = "Boom"
  
  }
  
  catch(err_) {
  	alert("Failed to get title" + err_)
  }
	
};
