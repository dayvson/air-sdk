var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var airSdk = require('../lib/air');
airSdk.update();

describe("AIR Library", function(){
  it("Should get all binaries bindings", function(){
    var binariesList = [ 'aasdoc','acompc','amxmlc','asdoc','compc',
                        'fdb','fontswf','mxmlc','optimizer','swcdepends','swfdump' ];
    should.exist(airSdk.binDir);
    expect(airSdk.binDir).to.equal(path.resolve(__dirname, "../lib/AIR_SDK/bin"));
    expect(fs.existsSync(airSdk.binDir)).to.equal(true);
    expect(Object.keys(airSdk.bin).toString()).to.equal(binariesList.toString());
    expect(fs.statSync(airSdk.bin.mxmlc).isFile()).to.equal(true);
  });

  it("Should compile a swf file", function(done){
    this.timeout(5000);
    var src = path.join(__dirname, 'fixtures/HelloWorldApp.as');
    var swf = path.join(__dirname, 'fixtures/HelloWorldApp.swf');
    var mxmlcArgs = ['+configname=air', src];
    var exec = airSdk.bin.mxmlc;

    if (process.platform !== 'win32') {
      mxmlcArgs.unshift(exec);
      exec = '/bin/sh';
    }

    childProcess.execFile(exec, mxmlcArgs, function(err, stdout, stderr) {
      expect(fs.statSync(swf).isFile()).to.equal(true);
      expect(stdout.toLowerCase().indexOf('fail')).to.equal(-1);
      expect(stderr.toLowerCase().indexOf('fail')).to.equal(-1);
      expect(stdout.toLowerCase().indexOf('error')).to.equal(-1);
      expect(stderr.toLowerCase().indexOf('error')).to.equal(-1);
      fs.unlinkSync(swf);
      done();
    });
  });

  it("Should throw an error trying to compile a swf file", function(done){
    this.timeout(5000);
    var src = path.join(__dirname, 'fixtures/ErrorApp.as');
    var swf = path.join(__dirname, 'fixtures/ErrorApp.swf');
    var mxmlcArgs = ['+configname=air', src];
    var exec = airSdk.bin.mxmlc;
    
    if (process.platform !== 'win32') {
      mxmlcArgs.unshift(exec);
      exec = '/bin/sh';
    }

    childProcess.execFile(exec, mxmlcArgs, function(err, stdout, stderr) {
      err.should.not.equal(null);
      expect(stderr.toLowerCase().indexOf('error') !== -1).to.equal(true);
      expect(err.toString().toLowerCase().indexOf('failed') !== -1).to.equal(true);
      done();
    });
  });
});