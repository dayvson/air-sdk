# node-air-sdk

forked from air-sdk

A NPM wrapper for the Adobe AIR SDK.
The idea it to provide simple access to AIR_SDK binaries using node. The package has been set up to fetch the Adobe AIR SDK and run `mxmlc, fdb, compc, optimizer, swcdepends, etc` for MacOS, Linux based platforms and Windows. 

## Building and Installing

```shell
npm install node-air-sdk 
npm install -g -node-air-sdk #installing globally
```

Download the source and run the tests. 

```shell
npm install .
npm test
```

## Usage for (Mac, Linux)
```js
var airSdk = require('node-air-sdk');
var mxmlc = airSdk.bin.mxmlc;
var src = '/fixtures/ErrorApp.as');
var childArgs = [mxmlc, '+configname=air', src];
childProcess.execFile('/bin/sh', mxmlcArgs, function(err, stdout, stderr) {
	console.log('Swf file generated');
});

```

## External Dependencies

If you intend to _use_ this module after it is installed, almost all of the Flex
SDK binary/executable files have an implicit dependency on Java being installed
on the system _and_ that it is available in the `PATH` such that it can be
invoked just by typing the command `java`.

