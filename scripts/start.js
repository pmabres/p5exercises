var path = require("path");
var fs = require("fs");
var bs = require("browser-sync").create("P5-Exercises");
var updateCurrent = require("./updateCurrent");
var currentExerciseFile = path.join(__dirname,"../current");

function main() {
  if (!fs.existsSync(currentExerciseFile)) {
    fs.writeFileSync(currentExerciseFile, "1");
  }
  updateCurrent();
  start();
}

function start() {
  bs.init({
    server: path.join(__dirname, "../exercises")
  });
  var onReload = function() {
    updateCurrent();
    bs.reload();
  }
  bs.watch(path.join(__dirname,"../exercises/**")).on("change", bs.reload);
  bs.watch(currentExerciseFile).on("change", onReload);
}

main();