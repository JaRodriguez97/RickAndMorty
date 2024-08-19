import { Personaje } from '@app/models/personaje';
import { ReplaySubject } from 'rxjs';
import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnInit {
  private personajesFavoritosSub = new ReplaySubject<Personaje[]>(1);
  private isBrowser: boolean;
  personajesFavritos$ = this.personajesFavoritosSub.asObservable();
  fav: string = 'PersonajesFavoritos';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      let favoritoStorage = JSON.parse(localStorage.getItem(this.fav)!);
      if (!favoritoStorage) localStorage.setItem(this.fav, JSON.stringify([]));
    }
  }

  async ngOnInit() {
    await this.getPersonajesFavoritos().catch((err) =>
      console.error('Error al recuperar favoritos', err)
    );
  }

  async getPersonajesFavoritos(): Promise<Personaje[]> {
    if (!this.isBrowser) return [];

    let personajesFavoritos = JSON.parse(localStorage.getItem(this.fav)!);

    this.personajesFavoritosSub.next(personajesFavoritos);

    return personajesFavoritos;
  }

  private async quitarFavorito(id: string): Promise<void> {
    let listaFavoritos = await this.getPersonajesFavoritos();

    if (!listaFavoritos.length) return;

    let personajes = listaFavoritos.filter((P) => P.id != id);

    if (this.isBrowser) {
      localStorage.setItem(this.fav, JSON.stringify([...personajes]));
      this.personajesFavoritosSub.next([...personajes]);
    }
  }

  private async agregarFavorito(personaje: Personaje): Promise<void> {
    let listaFavoritos = await this.getPersonajesFavoritos();

    if (this.isBrowser)
      localStorage.setItem(
        this.fav,
        JSON.stringify([...listaFavoritos, personaje])
      );

    this.personajesFavoritosSub.next([...listaFavoritos, personaje]);
  }

  async cambiarFavorito(personaje: Personaje): Promise<void> {
    let { id } = personaje,
      listaFavoritos = await this.getPersonajesFavoritos(),
      find = listaFavoritos.find((fav: Personaje) => fav.id === id);

    find
      ? this.quitarFavorito(id).catch((err) =>
          console.error('Error al quitar favorito', err)
        )
      : this.agregarFavorito(personaje).catch((err) =>
          console.error('Error al agregar favorito', err)
        );
  }
}
