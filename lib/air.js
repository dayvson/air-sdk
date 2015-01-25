var fs = require('fs');
var path = require('path');
var AIR_HOME = path.join(__dirname, 'AIR_SDK');
var binDir = path.join(AIR_HOME, 'bin');

var airSdk = {
  AIR_HOME: AIR_HOME,
  binDir: binDir,
  bin: {},
  refresh: function() {
    // Clear any existing bin mapping
    Object.keys(airSdk.bin).forEach(function(key) {
      delete airSdk.bin[key];
    });

    // Add binary executables to the bin mapping
    if (fs.existsSync(airSdk.binDir)) {
      var files = fs.readdirSync(airSdk.binDir);
      var winExecFiles = files.filter(function(filename) {
        var ext = filename.slice(-4).toLowerCase();
        return ext === '.bat' || ext === '.exe';
      });
      if (process.platform === 'win32') {
        winExecFiles.forEach(function(fileName) {
          var key = fileName.slice(0, -4);
          airSdk.bin[key] = path.join(binDir, fileName);
        });
      }
      else {
        var execFiles = winExecFiles.map(function(fileName) {
          return fileName.slice(0, -4);
        });
        execFiles.forEach(function(fileName) {
          airSdk.bin[fileName] = path.join(binDir, fileName);
        });
      }
    }
  }
};

// Load the initial bin mapping
airSdk.refresh();

module.exports = airSdk;