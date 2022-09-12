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
    path: 'episodios',
    loadChildren: () =>
      import('./components/episodios/episodios.module').then(
        (m) => m.EpisodiosModule
      ),
  },
  {
    path: 'listaPersonajes',
    loadChildren: () =>
      import(
        './components/personajes/lista-personajes/lista-personajes.module'
      ).then((m) => m.ListaPersonajesModule),
  },
  {
    path: 'detallesPersonaje/:id',
    loadChildren: () =>
      import(
        './components/personajes/detalles-personaje/detalles-personaje.module'
      ).then((m) => m.DetallesPersonajeModule),
  },
  {
    path: 'nosotros',
    loadChildren: () =>
      import('./components/nosotros/nosotros/nosotros.module').then(
        (m) => m.NosotrosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
