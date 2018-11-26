# Introduction

Ce module NodeJS permet de collecter un certain nombre de données et de métriques sur le modem-router Livebox d'Orange.

# Installation
```shell
npm install livebox-info
```

# Utilisation

Voici un exemple de structure de code pour l'utilisation de ce module. (Voir le fichier test.js)

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
