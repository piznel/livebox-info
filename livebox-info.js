var request = require( 'request' );

function _stdCall( request, contextID, args, callback ) {
  request({
    headers: {
      "X-Context"    : contextID,
      "Content-Type" : "application/x-sah-ws-4-call+json"
    },
    body: args
  }, function( err, response, data ) {
    //console.log( 'err: '     , JSON.stringify( err, null, 2 ) );
    //console.log( 'response: ', JSON.stringify( response, null, 2 ) );
    //console.log( 'data: '    , JSON.stringify( data, null, 2 )  );
    if( err ) {
      return callback( err );
    }
    if( Object.prototype.hasOwnProperty.call( data, 'status' ) ) {
      return callback( null, data );
    }
    return callback( data );
  });
}

module.exports = Livebox;

function Livebox( host, login, password ) {
  var contextID;
  var obj = {};
  request = request.defaults({
    jar     : true,
    json    : true,
    url     : 'http://' + host + '/ws',
    method  : 'POST'
  });

  obj.connect = function( callback ) {
    request({
      headers: {
        "Authorization" : "X-Sah-Login",
        "Content-Type"  : "application/x-sah-ws-4-call+json"
      },
      body: {
        "service" : "sah.Device.Information",
        "method"  : "createContext",
        "parameters" : {
          "applicationName" : "so_sdkut",
          "username"        : login,
          "password"        : password
        }
      }
    },

    function onRequest( err, response, data ) {
      //console.log( 'err: '     , JSON.stringify( err, null, 2 ) );
      //console.log( 'response: ', JSON.stringify( response, null, 2 ) );
      //console.log( 'data: '    , JSON.stringify( data, null, 2 )  );
      if( err ) {
        return callback( err );
      }
      if( Object.prototype.hasOwnProperty.call( data, 'status' ) && data.status === 0 ) {
        contextID = data.data.contextID;
        return callback( null );
      }
      return callback( data );
    });
  }

  obj.deviceInfo = function( callback ) {
    _stdCall( request, contextID, {
      "service"    : "DeviceInfo",
      "method"     : "get",
      "parameters" : {}
    },
    callback );
  }

  obj.getReseau = function(callback ) {
    _stdCall( request, contextID, {
      "service"    : "Hosts.Host",
      "method"     : "get",
      "parameters" : {}
    },
    callback );
  }

  obj.getDSLStats = function( callback ) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.dsl0",
      "method"     : "getDSLStats",
      "parameters" : {}
    },
    callback );
  }



  obj.getWifiState = function (callback) {
    _stdCall( request, contextID, {
      "service"    : "NMC.Wifi",
      "method"     : "get",
      "parameters" : {}
    },
    callback );
  }

  obj.getLanState = function (callback) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.lan",
      "method"     : "getMIBs",
      "parameters" : {}
    },
    callback );
  }

  obj.getIpLan = function (callback) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.lan",
      "method"     : "luckyAddrAddress",
      "parameters" : {}
    },
    callback );
  }

  obj.getIpWan = function (callback) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.data",
      "method"     : "luckyAddrAddress",
      "parameters" : {}
    },
    callback );
  }

  obj.getWanState = function (callback) {
    _stdCall( request, contextID, {
      "service"    : "NMC",
      "method"     : "getWANStatus",
      "parameters" : {}
    },
    callback );
  }

  
  obj.getNetDevStats = function (callback) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.wl0",
      "method"     : "getNetDevStats",
      "parameters" : {}
    },
    callback );
  }



  obj.getDslInfo = function( callback ) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.data",
      "method"     : "getMIBs",
      "parameters":
        {"mibs":"dsl",
        "flag":"",
        "traverse":"down"}
    },
    callback );
  }

  obj.getMibs = function( callback ) {
    _stdCall( request, contextID, {
      "service"    : "NeMo.Intf.data",
      "method"     : "getMIBs",
      "parameters" : {}
    },
    callback );
  }


  return obj;
}
