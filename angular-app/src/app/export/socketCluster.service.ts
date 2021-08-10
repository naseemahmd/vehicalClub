import { Injectable, OnInit } from '@angular/core';
import * as socketCluster from 'socketcluster-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SocketclientService {

  socket = socketCluster.create({
    hostname: "localhost",
    port: 8000,
  });
  
  constructor(private toastr: ToastrService) {
    
  }

    connectToSocketCluster(uidChannel: string){
    (async () => {
      
      let channel = this.socket.subscribe("customRemoteEvent");
      
      

      this.socket.transmit("customRemoteEvent",uidChannel );

      for await (let data of channel) {
        // ... Handle channel data.
          
          this.showSuccess(data)
      }
      })();
  
  
    }

    showSuccess(data:string) {
      this.toastr.success(`${data}`);
    }
    
  
}