import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distrito } from '../models/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private readonly baseUrl = 'https://localhost:7051/api/Distrito';

  constructor(private http: HttpClient) {}

  getDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`${this.baseUrl}/listar`);
  }
}
