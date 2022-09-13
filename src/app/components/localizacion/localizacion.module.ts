import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizacionRoutingModule } from './localizacion-routing.module';
import { LocalizacionComponent } from './localizacion.component';


@NgModule({
  declarations: [
    LocalizacionComponent
  ],
  imports: [
    CommonModule,
    LocalizacionRoutingModule
  ]
})
export class LocalizacionModule { }
