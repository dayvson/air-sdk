var fs = require('fs');
var path = require('path');
var AIR_HOME = path.join(__dirname, 'AIR_SDK');
var BIN_DIR = path.join(AIR_HOME, 'bin');
var airSdk = {
  AIR_HOME: AIR_HOME,
  binDir: BIN_DIR,
  bin: {},
  update: function() {
    var binaries, batExecFiles, execFiles;
    airSdk.bin = {};
    if (fs.existsSync(airSdk.binDir)) {
      binaries = fs.readdirSync(airSdk.binDir);
      batExecFiles = binaries.filter(function(filename) {
        var ext = filename.slice(-4).toLowerCase();
        return ext === '.bat';
      });

      if (process.platform === 'win32') {
        batExecFiles.forEach(function(filename) {
          var withoutExtention = filename.slice(0, -4);
          airSdk.bin[withoutExtention] = path.join(airSdk.binDir, filename);
        });
      }else {
        execFiles = batExecFiles.map(function(filename) {
          return filename.slice(0, -4);
        });
        execFiles.forEach(function(filename) {
          airSdk.bin[filename] = path.join(airSdk.binDir, filename);
        });
      }
    }
  }
};

airSdk.update();
module.exports = airSdk;