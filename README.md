# Introduction

This NodeJS module collects a number of data and metrics on the Orange Livebox router modem. Only tested with Livebox V4 (fiber).

# Installation
```shell
npm install livebox-info
```

# Utilisation

Here is an example of a code structure for using this module. (See the test.js file for all functions)

```js
var Livebox = require( 'livebox-info' );
var livebox = new Livebox( '192.168.1.1', 'admin', 'motdepasse' );

livebox.connect( function( err ) {

  // Vérifier les erreurs
  if( err ) {
    process.exit( 1 );
  }

  livebox.deviceInfo( function( err, data ) {

    // Vérifier les erreurs
    if( err ) {
      process.exit( 1 );
    }

    // Play with data
    console.log( data );
  })
})
```
