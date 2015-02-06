# air-sdk

A NPM wrapper for the Adobe AIR SDK.

## Building and Installing

```shell
npm install air-sdk 
npm install -g air-sdk #installing globally
```

Download the source and run. 

```shell
npm install .
```

The package has been set up to fetch the Adobe AIR SDK and run `mxmlc, fdb, compc, optimizer, swcdepends` for MacOS (darwin),
Linux based platforms (as identified by Node.js), and Windows.  If you
spot any platform weirdnesses, let me know or send a patch.


## External Dependencies

If you intend to _use_ this module after it is installed, almost all of the Flex
SDK binary/executable files have an implicit dependency on Java being installed
on the system _and_ that it is available in the `PATH` such that it can be
invoked just by typing the command `java`.



## This project was inspired by node-flex-sdk 
git@github.com:JamesMGreene/node-flex-sdk.git
