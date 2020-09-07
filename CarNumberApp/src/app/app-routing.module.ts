import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCarPlateComponent } from './add-car-plate/add-car-plate.component';
import { CarPlateTableComponent } from './car-plate-table/car-plate-table.component';
import { EditCarPlateComponent } from './edit-car-plate/edit-car-plate.component';

const routes: Routes = [
  { path: '', component: CarPlateTableComponent },
  { path: 'add', component: AddCarPlateComponent },
  { path: 'edit/:id', component: EditCarPlateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
