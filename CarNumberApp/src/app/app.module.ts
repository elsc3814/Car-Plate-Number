import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarPlateTableComponent } from './car-plate-table/car-plate-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddCarPlateComponent } from './add-car-plate/add-car-plate.component';
import { EditCarPlateComponent } from './edit-car-plate/edit-car-plate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarNumberPlateDetailsComponent } from './car-number-plate-details/car-number-plate-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CarPlateTableComponent,
    AddCarPlateComponent,
    EditCarPlateComponent,
    CarNumberPlateDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
