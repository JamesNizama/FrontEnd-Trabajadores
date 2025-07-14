import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private readonly baseUrl = 'https://localhost:7051/api/Trabajador';

  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.baseUrl}/listar`);
  }

  crearTrabajador(trabajador: Trabajador): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, trabajador);
  }

  actualizarTrabajador(trabajador: Trabajador): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar`, trabajador);
  }

  eliminarTrabajador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
