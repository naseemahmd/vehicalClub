import { Component, OnInit } from '@angular/core';
import {ResolverService} from "./resolver.service"
import { HttpClient } from "@angular/common/http";
import { Apollo, gql } from 'apollo-angular';
import {vehical } from '../model/vehical'
import {NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
// import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-vehicale-detail',
  templateUrl: './vehicale-detail.component.html',
  styleUrls: ['./vehicale-detail.component.css'],
  providers: [ResolverService]
})
export class VehicaleDetailComponent implements OnInit {

  public vehicle_details:vehical[] = [];
  offset = 0;
  slecetedId =''
  selected:any = '';
  vahicalID= ''

  constructor(private dService:ResolverService, private http:HttpClient, private apollo:Apollo,private modalService: NgbModal) { }

  updateForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
  })

  async ngOnInit() {
      this.vehicle_details = []
      await (await this.dService.getVehical(100))
      .valueChanges.subscribe(({ data }) => {
        this.vehicle_details = data.vehicals;
         
      });;
   
         
  }
  async changeOffset(value:string) {
    this.vehicle_details = [];
    if(value === '+'){
      this.offset = this.offset + 100  
    }else{
     this.offset = this.offset - 100 
     if(this.offset < 0){
       this.offset = 0
     }  
    }
    
    await (await this.dService.getVehical(this.offset))
      .valueChanges.subscribe(({ data }) => {
        this.vehicle_details = data.vehicals;
         
      });;
  
  }

  openModel(id:string,content:any){
        this.slecetedId = id

        this.vehicle_details.forEach(vehical =>{ 
          if(vehical.id == this.slecetedId){
            this.selected = vehical
          }
        })
        this.vahicalID = this.selected.v_id
        this.updateForm.patchValue({
          firstName: this.selected.first_name,
          lastName: this.selected.last_name,
          email: this.selected.email
        } )
  
        this.modalService.open(content, {ariaLabelledBy:'update-pop-up'}).result
  }

  async updateVehical(){
        console.log(this.updateForm.value.firstName, "form");
        this.dService.updateVehical(this.updateForm,this.slecetedId)
         .subscribe(({ data }) => {
            console.log(data,"herere");
            this.modalService.dismissAll()
            this.ngOnInit()
            this.slecetedId = ""
             
          },(error) => {
            console.log('there was an error sending the query', error);
          });
      }

 async deleteVahical(){
  this.dService.deleteVehicale(this.slecetedId)      
  .subscribe(({ data }) => {
            console.log(data,"herere");
            this.modalService.dismissAll()
            this.ngOnInit()
            this.slecetedId = ""
             
          },(error) => {
            console.log('there was an error sending the query', error);
          });
      }


async search(search: string) {
  if(search === ''){
            this.ngOnInit()
   }else{
    this.vehicle_details = []
      await (await this.dService.search(search))
      .valueChanges
        .subscribe(({ data }) => {
          console.log(data.vehicals,"sss");
          this.vehicle_details = data.vehicals;
        }); 

      }
   }
  
    
}
