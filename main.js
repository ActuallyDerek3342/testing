/* If there is an error then script will not run*/
window.win = function() {
	alert("Running");
	/*window.location.href = "https://raw.githubusercontent.com/ActuallyDerek3342/testing/main/html.html"*/
	try {
	  var get_title = console.log(document.title);
	  let text = get_title;
	  alert(text);
	  let result = text.replace("Update");
	};
	catch() {
	  window.location.href = "https://www.google.com";
	};
	alert("END");
};
