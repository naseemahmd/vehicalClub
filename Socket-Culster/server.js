
const http = require("http");
const socketClusterServer = require("socketcluster-server");


let httpServer = http.createServer();
let agServer = socketClusterServer.attach(httpServer);

const connections = [];

(async () => {
  
  for await (let { socket } of agServer.listener('connection')) {
    connections.push(socket);
    
    (async () => {
      
      for await (let { socket } of agServer.listener('connection')) {
        connections.push(socket);
        connections.forEach(e => console.log('array' + e.id));
      
        // for await (let data of socket.receiver('customRemoteEvent')) {
        //   console.log(data,"dadae");
        //   // agServer.exchange.transmitPublish(
        //   //   "customRemoteEvent",
        //   //   `${data}`
        //   // );
        // }
      }
    })();
  

  }
})();

// port 8000
httpServer.listen(8000);
console.log("it's Running");
