import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportFileComponent } from './import-file/import-file.component'
import { HomeComponent } from './home/home.component';
import { ExportComponent } from './export/export.component';
import { VehicaleDetailComponent } from './vehicale-detail/vehicale-detail.component';

const routes: Routes = [
  { path: 'import', component: ImportFileComponent },
  { path: 'export', component: ExportComponent },
  { path: 'detail', component: VehicaleDetailComponent },
  { path: '', component: HomeComponent },

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ImportFileComponent,HomeComponent,ExportComponent,VehicaleDetailComponent]