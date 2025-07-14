import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';

const routes: Routes = [
  { path: 'Trabajador', component: TrabajadorComponent }, 
  { path: '', redirectTo: 'Trabajador', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
