import { Injectable } from '@nestjs/common';
import * as socketCluster from 'socketcluster-client';

@Injectable()
export class SocketclusterService {
  uidChannels = [];
  http = require('http');
  // socketClusterServer = require('socketcluster-server');

  // httpServer = this.http.createServer();
  // agServer = this.socketClusterServer.attach(this.httpServer);

  socket = socketCluster.create({
    hostname: 'localhost',
    port: 8000,
  });
  channel: any;
  connectToSocketCluster(uidChannel: string) {
    (async () => {
      console.log('herer 01');
      this.channel = this.socket.subscribe('customRemoteEvent');

      console.log('herer 02', this.channel);

      //this.socket.transmit("customRemoteEvent",uidChannel );

      // eslint-disable-next-line prefer-const
      for await (let data of this.channel) {
        // ... Handle channel data.
        //console.log("herer 03", data);
        // this.showSuccess(data)
        //this.socket.transmit("customRemoteEvent",`${data}` );
      }
    })();
  }

  async sendMessage(uidChannel: string, fileInfo: any) {
    console.log('messages Sended to client');
    console.log(uidChannel + ' received channel ' + JSON.stringify(fileInfo));

    await this.channel.invokePublish('The File is out for Download');
  }
}
