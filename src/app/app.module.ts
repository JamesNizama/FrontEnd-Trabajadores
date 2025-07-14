import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrabajadorComponent,
    DepartamentoComponent,
    DistritoComponent,
    ProvinciaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
