var Livebox = require('../livebox-info.js');
var livebox = new Livebox('192.168.1.1', 'admin', '');

livebox.connect(function(err) {

  // Vérifier les erreurs
  if (err) {
    process.exit(1);
  }

  // Info Livebox
  livebox.deviceInfo(function(err, data) {
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** INFO LIVEBOX *****');
    console.log('Manufacturer :', data.status.Manufacturer);
    console.log('ModelName :', data.status.ModelName);
    console.log('Description :', data.status.Description);
    console.log('ProductClass :', data.status.ProductClass);
    console.log('SerialNumber :', data.status.SerialNumber);
    console.log('HardwareVersion :', data.status.HardwareVersion);
    console.log('SoftwareVersion :', data.status.SoftwareVersion);
    console.log('RescueVersion :', data.status.RescueVersion);
    console.log('ModemFirmwareVersion :', data.status.ModemFirmwareVersion);
    console.log('EnabledOptions :', data.status.EnabledOptions);
    console.log('AdditionalHardwareVersion :', data.status.AdditionalHardwareVersion);
    console.log('AdditionalSoftwareVersion :', data.status.AdditionalSoftwareVersion);
    console.log('SpecVersion :', data.status.SpecVersion);
    console.log('ProvisioningCode :', data.status.ProvisioningCode);
    console.log('UpTime :', data.status.UpTime);
    console.log('ManufacturerURL :', data.status.ManufacturerURL);
    console.log('Country :', data.status.Country);
    console.log('NumberOfReboots :', data.status.NumberOfReboots);
    console.log('AdditionalSoftwareVersions :', data.status['X_SOFTATHOME-COM_AdditionalSoftwareVersions']);
    console.log('macAddress :', data.status.BaseMAC);
    console.log('IP wan :', data.status.ExternalIPAddress)
  })

  // Récupère les machines connectées
  livebox.getReseau(function(err, data) {
    if (err) {
      console.log(err)
      process.exit(1);
    }

    var device = [];
    var group = data.status;
    var allPropertyNames = Object.keys(data.status);
    for (var j = 0; j < allPropertyNames.length; j++) {
      var macAddress = allPropertyNames[j];
      var ipAddress = group[macAddress].IPAddress;
      device.push({ 'name': group[macAddress].HostName, 'macAddress': macAddress, 'IPAddress': ipAddress, 'vendor': group[macAddress].VendorClassID, 'active': group[macAddress].Active, 'ipStatic': group[macAddress].LeaseTimeRemaining === 0 ? true : false })
    }
    console.log('')
    console.log('***** MACHINES CONNECTEES *****');
    console.log('nbre de device :', device.length);
    console.log('device', device);
  })

  // Stat ADSL
  livebox.getDSLStats(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** STAT ADSL *****');
    console.log('ReceiveBlocks :', data.status.ReceiveBlocks);
    console.log('TransmitBlocks :', data.status.TransmitBlocks);
    console.log('CellDelin :', data.status.CellDelin);
    console.log('LinkRetrain :', data.status.LinkRetrain);
    console.log('InitErrors :', data.status.InitErrors);
    console.log('InitTimeouts :', data.status.InitTimeouts);
    console.log('LossOfFraming :', data.status.LossOfFraming);
    console.log('ErroredSecs :', data.status.ErroredSecs);
    console.log('SeverelyErroredSecs :', data.status.SeverelyErroredSecs);
    console.log('FECErrors :', data.status.FECErrors);
    console.log('ATUCFECErrors :', data.status.ATUCFECErrors);
    console.log('HECErrors :', data.status.HECErrors);
    console.log('ATUCHECErrors :', data.status.ATUCHECErrors);
    console.log('CRCErrors :', data.status.CRCErrors);
    console.log('ATUCCRCErrors :', data.status.ATUCCRCErrors)
  })

  // Info Wifi
  livebox.getWifiState(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** INFO WIFI *****');
    console.log('Enable :', data.status.Enable)
    console.log('Status :', data.status.Status)
    console.log('ConfigurationMode :', data.status.ConfigurationMode)
    console.log('BGNUserBandwidth :', data.status.BGNUserBandwidth)
  })

  // Info Lan
  livebox.getIpLan(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** INFO IP LAN *****');
    console.log('IP Livebox :', data.status)
  })

  // Info Wan
  livebox.getIpWan(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** INFO IP WAN *****');
    console.log('IP Wan :', data.status)
  })

  // Info Wan state
  livebox.getWanState(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** INFO WAN *****');
    console.log('status :', data.status)
    console.log('WanState :', data.data.WanState)
    console.log('LinkType :', data.data.LinkType)
    console.log('LinkState :', data.data.LinkState)
    console.log('MACAddress :', data.data.MACAddress)
    console.log('Protocol :', data.data.Protocol)
    console.log('ConnectionState :', data.data.ConnectionState)
    console.log('LastConnectionError :', data.data.LastConnectionError)
    console.log('IPAddress :', data.data.IPAddress)
    console.log('RemoteGateway :', data.data.RemoteGateway)
    console.log('DNSServers :', data.data.DNSServers)
    console.log('IPv6Address :', data.data.IPv6Address)
  })


  // Net state
  livebox.getNetDevStats(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** NET STATE *****');
    console.log('RxPackets :', data.status.RxPackets)
    console.log('TxPackets :', data.status.TxPackets)
    console.log('RxBytes :', data.status.RxBytes)
    console.log('TxBytes :', data.status.TxBytes)
    console.log('RxErrors :', data.status.RxErrors)
    console.log('TxErrors :', data.status.TxErrors)
    console.log('RxDropped :', data.status.RxDropped)
    console.log('TxDropped :', data.status.TxDropped)
    console.log('Multicast :', data.status.Multicast)
    console.log('Collisions :', data.status.Collisions)
    console.log('RxLengthErrors :', data.status.RxLengthErrors)
    console.log('RxOverErrors :', data.status.RxOverErrors)
    console.log('RxCrcErrors :', data.status.RxCrcErrors)
    console.log('RxFrameErrors :', data.status.RxFrameErrors)
    console.log('RxFifoErrors :', data.status.RxFifoErrors)
    console.log('RxMissedErrors :', data.status.RxMissedErrors)
    console.log('TxAbortedErrors :', data.status.TxAbortedErrors)
    console.log('TxCarrierErrors :', data.status.TxCarrierErrors)
    console.log('TxFifoErrors :', data.status.TxFifoErrors)
    console.log('TxHeartbeatErrors :', data.status.TxHeartbeatErrors)
    console.log('TxWindowErrors :', data.status.TxWindowErrors)
  })


  // DSL Info
  livebox.getDslInfo(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** DSL INFO *****');
    console.log('Stat DSL :', data)
  })



  // MIBS
  livebox.getMibs(function(err, data) {

    // Vérifier les erreurs
    if (err) {
      console.log(err)
      process.exit(1);
    }
    console.log('')
    console.log('***** MIBS *****');
    if (data.status.dsl.hasOwnProperty('dsl0')) {
      // livebox ADSL
      console.log('')
      console.log('***** MIBS *****');
      console.log('LastChange :', data.status.dsl.dsl0.LastChange);
      console.log('UpstreamCurrRate (Kb/s) :', data.status.dsl.dsl0.UpstreamCurrRate);
      console.log('DownstreamCurrRate (Kb/s) :', data.status.dsl.dsl0.DownstreamCurrRate);
      console.log('UpstreamMaxRate (Kb/s) :', data.status.dsl.dsl0.UpstreamMaxRate);
      console.log('DownstreamMaxRate (Kb/s) :', data.status.dsl.dsl0.DownstreamMaxRate);      
      console.log('UpstreamNoiseMargin (dB):', data.status.dsl.dsl0.UpstreamNoiseMargin / 10);
      console.log('DownstreamNoiseMargin :', data.status.dsl.dsl0.DownstreamNoiseMargin / 10);
      console.log('UpstreamAttenuation (dB) :', data.status.dsl.dsl0.UpstreamAttenuation / 10);
      console.log('DownstreamAttenuation (dB):', data.status.dsl.dsl0.DownstreamAttenuation / 10);
      console.log('UpstreamPower (dBm) :', data.status.dsl.dsl0.UpstreamPower);
      console.log('DownstreamPower (dBm) :', data.status.dsl.dsl0.DownstreamPower);  
    } else {
      // livebox FIBRE

    }
  })
})