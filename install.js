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
var tmpLocation = path.join(__dirname, 'lib', name);
var frameworksDir = path.join(__dirname, libFolder);
var pathFlexFrameworksSWC = path.join(__dirname, libFolder, 'frameworks/libs/');
var progress = require('request-progress');

fs.stat(libFolder, function(err, stats) {
  if(!err) {
      console.log("AIR SDK was already downloaded");
      process.exit(0);
  }

  console.log("Downloading Adobe AIR SDK, please wait...");
  progress(request(downloadUrl, function (error, response, body) {
    if(error || response.statusCode !== 200){
      console.error("Could not download AIR SDK!");
      process.exit(1);
      return;
    }
    console.log("AIR SDK download complete!");
    shell.mkdir(libFolder);
    console.log("Preparing to extract file...");
    var extract = shell.exec('tar -xjf ' + tmpLocation + ' -C ' + libFolder);
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
      shell.cp("extra/framework.swc", pathFlexFrameworksSWC);
      process.exit(err ? 1 : 0);
    });
  }))
  .on('progress', function (state) {
    process.stdout.write('Downloading progress: ' + state.percent + "% \r");
  })
  .pipe(fs.createWriteStream(tmpLocation));

  process.on('uncaughtException', function(err) {
    console.error('FATAL! Uncaught exception: ' + err);
    process.exit(1);
  });
});