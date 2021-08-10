import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import {vehical } from '../model/vehical';



@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(private http:HttpClient, private apollo:Apollo) { }
  public vehicle_details:vehical[] = [];
 
  async getVehical(value:Number){
  
    const GET_VEHICAL =  gql` query Vehicals($offset:Float!){
      vehicals(ofset:$offset){
        id
        v_id
        first_name
        last_name
        email
        age_of_vehicle
        car_make
        car_model
        vin_number
        manufactured_date 
      
      }
    }
  `
    let data =  this.apollo.watchQuery<any>({
      query:GET_VEHICAL,
      variables:{
        offset:value
      }
    })
    
    return data
        
  }

  updateVehical(updateForm:FormGroup,slecetedId:string){
    
    const UPDATE_VHICAL  = gql` mutation UpadteVehicle($email:String!,$firstName:String,$lastName:String!,$id:String!){
      updateVehicleDetails(
        updateVehicaleData: {
          email: $email,
          firstName: $firstName,
          lastName: $lastName
        }
        id: $id
      ) 
      {
        id
        v_id
        first_name
        last_name
        email
        age_of_vehicle
        car_make
        car_model
        vin_number
        manufactured_date 
      
      }
    }
  `

    let data = this.apollo.mutate<any>(
      {
        mutation:UPDATE_VHICAL,
        variables:{
          id:slecetedId,
          email:updateForm.value.email,
          firstName:updateForm.value.firstName,
          lastName:updateForm.value.lastName
        } 
    }
    )
    return data
  }

  deleteVehicale(slecetedId:string) {
    const DELETE_VEHICAL = gql` mutation DeleteVehical($id:String!){
      deleteVehicleDetails(id:$id) {
        id
      }
    }
  ` 

    let data = this.apollo.mutate<any>(
      {
        mutation:DELETE_VEHICAL,
        variables:{
          id:slecetedId
        }
       }
    ) 

    return data
  }

search(search:string) {
  
  const SEARCH = gql` query Search($search:String){
    vehicals(model:$search){
      id
      v_id
      first_name
      last_name
      email
      age_of_vehicle
      car_make
      car_model
      vin_number
      manufactured_date 
    
    }
  }
`

  let data = this.apollo.watchQuery<any>({
    query:SEARCH,
      variables:{
        search:search
      }  
    })
    return data
  }
  

}
