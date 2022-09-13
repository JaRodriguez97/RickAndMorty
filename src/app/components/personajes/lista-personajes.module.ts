import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPersonajesRoutingModule } from './lista-personajes-routing.module';
import { ListaPersonajesComponent } from './lista-personajes.component';

@NgModule({
  declarations: [ListaPersonajesComponent],
  imports: [CommonModule, ListaPersonajesRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListaPersonajesModule {}
