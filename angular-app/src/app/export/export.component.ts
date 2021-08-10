import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {SocketclientService} from './socketCluster.service'
import {NgbModal, } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  minAge: Number = 0;
  maxAge: Number = 0;
  uidChannel = "300";
  
  constructor(private router: Router,
    
    private http: HttpClient, private socketclientService:SocketclientService
    ,private modalService: NgbModal) {
    
   }
  
  ngOnInit(): void {
    this.socketclientService.connectToSocketCluster(this.uidChannel)
  }
  onClickMe() {
    if(this.minAge == 0 || this.maxAge == 0){
      alert("Can be empty or Enter the value greater then 0")
    }
    this.http.get(`http://localhost:3000/Download/?maxAge=${this.maxAge}&minAge=${this.minAge}&uidChannel=${this.uidChannel}`).subscribe(
      res => {
        if(res){
        
        console.log(res,"res");
        this.minAge = 0
        this.maxAge = 0
        }
      }
    )
    
    console.log(this.minAge,this.maxAge)
  }

  
  
}
