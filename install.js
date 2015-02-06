var fs = require('fs');
var path = require('path');
var airSdk = require('./lib/air');
var request = require('request');
var playerGlobal = require('playerglobal-latest');
var packageMetadata = require('./package.json');
var shell = require('shelljs');
var downloadUrl = packageMetadata.airSdk.url;
var name = 'AIRSDK_Compiler.tbz2';
var libFolder = 'lib/AIR_SDK';
var tmpLocation = path.join(__dirname, 'lib', name)
var frameworksDir = path.join(__dirname, libFolder);
console.log("Downloading Adobe AIR SDK, please wait...");

request(downloadUrl, function (error, response, body) {
  console.log("AIR SDK download complete!");
  shell.mkdir(libFolder);
  console.log("Preparing to extract file...");
  var extract = shell.exec('tar -zxf ' + tmpLocation + ' -C ' + libFolder);
  console.log("File extracted...");
  shell.rm(tmpLocation);
  console.log("Installing all playerglobal frameworks...");
  airSdk.update();
  playerGlobal.install(frameworksDir, function(err) {
    if (err) {
      console.error('Failed to install the latest "playerglobal.swc" library collection!', err);
    } else {
      console.log('Successfully installed the latest "playerglobal.swc" library collection.');
    }
    process.exit(err ? 1 : 0);
  });
}).pipe(fs.createWriteStream(tmpLocation));

process.on('uncaughtException', function(err) {
  console.error('FATAL! Uncaught exception: ' + err);
  process.exit(1);
});
