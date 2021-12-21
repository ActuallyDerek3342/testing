window.win = function() {
 var change = "M: Alert";
 alert("Running[C: " + change + "]");
 const { spawn } = require('child_process');
 const temperatures = [];
 
 const sensor = spawn('python', ['py_test.py']);
 alert("mid");
 sensor.stdout.on('data', function(data) {

     temperatures.push(parseFloat(data));
     alert("Data: " + temperatures);
 });
}
