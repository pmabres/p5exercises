// Create an named instance in one file...
var path = require("path");
var bs = require("browser-sync").create("P5-Exercises");
var updateCurrent = require("./updateCurrent");
updateCurrent();
bs.init({
    server: path.join(__dirname, "../exercises")
});

var onReload = function() {
	updateCurrent();
	bs.reload();
}
// and call any methods on it.
bs.watch(path.join(__dirname,"../exercises/**")).on("change", bs.reload);
bs.watch(path.join(__dirname,"../current")).on("change", onReload);