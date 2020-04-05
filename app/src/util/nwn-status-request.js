const dgram = require('dgram');

const message = Buffer.from([0x42,0x4e,0x58,0x49,0x00,0x14,0x00]);
const timeoutDuration = 3000;

module.exports = ({ port, host }) => {
  return new Promise((resolve, reject) => {
    let timeout;

    var server = dgram.createSocket('udp4');

    const fail = (message) => {
      server.close();
      reject({ message });
    };

    const succeed = (statusData) => {
      server.close();
      resolve(statusData);
    }

    server.on('error', function(e) {
      console.log('error: ', e);
      throw e;
    });

    server.on("message", function (messageBuffer, remoteInfo) {
      const messageAsHex = messageBuffer.toString('hex');

      console.log(`got message of length ${messageBuffer.length} from ${remoteInfo.address}:${remoteInfo.port}: ${messageAsHex}`);

      const game = messageAsHex[13] === 'c' ? 'NWN2' : 'NWN1';
      const players = Number.parseInt(messageAsHex.substring(20, 22), 16);
      const maxPlayers = Number.parseInt(messageAsHex.substring(22, 24), 16);
      const pvpTypeIndicator = Number.parseInt(messageAsHex.substring(26, 28), 16);
      let pvpType = 'None';
      switch (pvpTypeIndicator) {
        case 0:
          pvpType = 'None';
          break;
        case 1:
          pvpType = 'Party';
          break;
        case 2:
          pvpType = 'Full PvP';
          break;
      }

      // const moduleName = messageBuffer.toString('utf8').substring(16);

      // Commenting out fields that aren't being used
      succeed({
        // game,
        players,
        // maxPlayers,
        // pvpType,
        // moduleName
      });
    });

    //emits when socket is ready and listening for datagram msgs
    server.on('listening',function(){
      var address = server.address();
      console.log(`Listening at address ${JSON.stringify(address)}`);
    });

    //emits after the socket is closed using socket.close();
    server.on('close',function(){
      console.log('Socket is closed!');
      clearTimeout(timeout);
    });

    server.send(message, 0, message.length, port, host, function(err, bytes) {
      if (err) {
        console.error('failed to send message', err);
        fail('failed sending message');
      }
      console.log(`UDP message sent to ${host}:${port}`);
    });

    timeout = setTimeout(function(){
      fail('timeout elapsed');
    }, timeoutDuration);
  })
}