import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarPlateNumber } from '../models/car-plate-number';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarNumberPlateService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAllCarNumbers(): Observable<CarPlateNumber[]> {
    return this.httpClient.get<CarPlateNumber[]>(this.baseUrl);
  }

  deleteCarNumber(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

  addCarNumber(carPlateNumber: CarPlateNumber): Observable<CarPlateNumber> {
    return this.httpClient.post<CarPlateNumber>(this.baseUrl, carPlateNumber);
  }

  editCarNumber(id: number, carPlateNumber: CarPlateNumber): Observable<CarPlateNumber> {
    return this.httpClient.patch<CarPlateNumber>(this.baseUrl + '/' + id, carPlateNumber);
  }

  getCarNumberById(id: number): Observable<CarPlateNumber> {
    return this.httpClient.get<CarPlateNumber>(this.baseUrl + '/' + id);
  }

  checkCarNumber(carNumber: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.baseUrl + '/availability/' + carNumber);
  }
}
