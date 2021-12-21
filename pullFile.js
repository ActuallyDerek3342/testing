window.win(); {
 alert("Running");
 const { spawn } = require('child_process');
 const temperatures = [];
 
 const sensor = spawn('python', ['py_test.py']);
 sensor.stdout.on('data', function(data) {

     temperatures.push(parseFloat(data));
     alert("Data: " + temperatures);
 });
 alert("done");
}
