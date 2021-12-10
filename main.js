
window.win = function() {
	alert("Running");
	window.location.href = ""
	var xhr= new XMLHttpRequest();
	xhr.open('GET', 'https://raw.githubusercontent.com/ActuallyDerek3342/testing/main/html.html', true);
	xhr.onreadystatechange= function() {
	    if (this.readyState!==4) return;
	    if (this.status!==200) return; // or whatever error handling you want
	    document.getElementById('y').innerHTML= this.responseText;
	};
	xhr.send
	alert("done");
};
