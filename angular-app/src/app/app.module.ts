import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApolloModule} from './apollo.module'
//import {SocketclientService} from './export/socketCluster.service'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DataService} from './data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SocketclientService} from './export/socketCluster.service'


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule, NgbModule,ApolloModule
  ],
  providers: [DataService, SocketclientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
