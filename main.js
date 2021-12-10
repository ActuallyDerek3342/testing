
window.win = function() {
	alert("Running");
	window.location.href = "https://youtube.com"
	var xhr= new XMLHttpRequest();
	xhr.open('GET', 'https://www.google.com', true);
	xhr.onreadystatechange= function() {
	    if (this.readyState!==4) return;
	    if (this.status!==200) return; // or whatever error handling you want
	    document.getElementById('y').innerHTML= this.responseText;
	};
	xhr.send
	alert("done");
};
