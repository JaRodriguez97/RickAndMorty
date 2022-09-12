import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeComponent } from './personaje.component';

@NgModule({
  declarations: [PersonajeComponent],
  imports: [CommonModule],
  exports: [PersonajeComponent],
})
export class PersonajeModule {}
