import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CarNumberPlateService } from '../car-number-plate.service';
import { CarPlateNumber } from 'src/models/car-plate-number';

@Component({
  selector: 'app-car-plate-table',
  templateUrl: './car-plate-table.component.html',
  styleUrls: ['./car-plate-table.component.css']
})
export class CarPlateTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CarPlateNumber>;
  dataSource: MatTableDataSource<CarPlateNumber> = new MatTableDataSource([]);

  displayedColumns = ['carNumber', 'owner', 'actions'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private service: CarNumberPlateService) {
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
    iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
  }

  ngOnInit(): void {
    this.service.getAllCarNumbers().subscribe(
      ok => {
        this.dataSource = new MatTableDataSource(ok);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => { },
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCarNumberPlate(carPlate: CarPlateNumber): void {
    const confirmed = confirm(`Are you sure you want to delete this ${carPlate.carNumber} car plate number?`);
    if (confirmed) {
      this.service.deleteCarNumber(carPlate.id).subscribe(
        ok => {
          this.dataSource.data.splice(this.dataSource.data.indexOf(carPlate), 1);
          this.dataSource._updateChangeSubscription();
        }
      );
    }
  }
}
