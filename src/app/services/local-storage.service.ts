import { Personaje } from '@app/models/personaje';
import { ReplaySubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnInit {
  private personajesFavoritosSub = new ReplaySubject<Personaje[]>(1);
  personajesFavritos$ = this.personajesFavoritosSub.asObservable();
  fav: string = 'PersonajesFavoritos';

  constructor() {
    let favoritoStorage = JSON.parse(localStorage.getItem(this.fav)!);
    if (!favoritoStorage) localStorage.setItem(this.fav, JSON.stringify([]));
  }

  async ngOnInit() {
    await this.getPersonajesFavoritos().catch((err) =>
      console.error('Error al recuperar favoritos', err)
    );
  }

  async getPersonajesFavoritos(): Promise<Personaje[]> {
    let personajesFavoritos = JSON.parse(localStorage.getItem(this.fav)!);

    this.personajesFavoritosSub.next(personajesFavoritos);

    return personajesFavoritos;
  }

  private async quitarFavorito(id: string) {
    let listaFavoritos = await this.getPersonajesFavoritos(),
      personajes = listaFavoritos.filter((P) => P.id != id);

    localStorage.setItem(this.fav, JSON.stringify([...personajes]));
    this.personajesFavoritosSub.next([...personajes]);
  }

  private async agregarFavorito(personaje: Personaje) {
    let listaFavoritos = await this.getPersonajesFavoritos();
    localStorage.setItem(
      this.fav,
      JSON.stringify([...listaFavoritos, personaje])
    );

    this.personajesFavoritosSub.next([...listaFavoritos, personaje]);
  }

  async cambiarFavorito(personaje: Personaje): Promise<void> {
    let { id } = personaje,
      listaFavoritos = await this.getPersonajesFavoritos(),
      find = !!listaFavoritos.find((fav: Personaje) => fav.id === id);

    find
      ? this.quitarFavorito(id).catch((err) =>
          console.error('Error al quitar favorito', err)
        )
      : this.agregarFavorito(personaje).catch((err) =>
          console.error('Error al agregar favorito', err)
        );
  }
}
