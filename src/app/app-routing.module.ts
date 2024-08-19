import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'listaPersonajes', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./components/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'listaPersonajes',
    loadChildren: () =>
      import('./components/personajes/lista-personajes.module').then(
        (m) => m.ListaPersonajesModule
      ),
  },
  {
    path: 'episodios/:id',
    loadChildren: () =>
      import('./components/episodios/episodios.module').then(
        (m) => m.EpisodiosModule
      ),
  },
  {
    path: 'nosotros',
    loadChildren: () =>
      import('./components/nosotros/nosotros.module').then(
        (m) => m.NosotrosModule
      ),
  },
  {
    path: 'localizacion/:id',
    loadChildren: () =>
      import('./components/localizacion/localizacion.module').then(
        (m) => m.LocalizacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
