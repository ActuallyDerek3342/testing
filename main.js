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
	var added = "custom icon";
	alert("Running...[" + added + "]")
  	var url = window.location.href
	
	var title_name = window.prompt("(E) title>");
	var icon_img = window.prompt("(E) icon>");
	
	document.title = title_name;
     	var link = document.querySelector("link[rel~='icon']");
	if (!link) {
        	link = document.createElement('link');
		link.rel = 'icon';
		document.getElementsByTagName('head')[0].appendChild(link);
		link.href = icon_img;
		const text = document.getElementsByClassName('second')[0];
		text.textContent = ":)"
			}
	
};
