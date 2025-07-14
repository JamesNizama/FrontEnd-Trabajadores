import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private readonly baseUrl = 'https://localhost:7051/api/Provincia';

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.baseUrl}/listar`);
  }
}
