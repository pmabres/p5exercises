var path = require('path');
var fs = require('fs');
var root = __dirname;

var updateCurrent = function () {
	var currentExercise = fs.readFileSync(path.join(root,'../current'));
	var folders = fs.readdirSync(path.join(root,'../exercises'));
	for (var i=0; i<folders.length; i++) {
	    if (folders[i].indexOf(currentExercise) !== -1) {
	    	currentExercise = folders[i];
	    	break;
	    }
	}
	var content = `
	var script = document.createElement('script');
	script.src = './${currentExercise}/index.js';
	document.head.appendChild(script); 
	`;
	fs.writeFileSync(path.join(root, '../exercises/autoload.js'), content);
}

module.exports = updateCurrent;