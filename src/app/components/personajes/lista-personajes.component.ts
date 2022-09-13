import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Personaje } from '@app/models/personaje';
import { LocalStorageService } from '@app/services/local-storage.service';
import { QueryServiceService } from '@app/services/query-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css'],
})
export class ListaPersonajesComponent implements OnInit {
  personajes$!: Observable<Personaje[]>;
  pageCount = 1;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private queryServiceService: QueryServiceService,
    private localStorageService: LocalStorageService,
    private spinnerService: NgxSpinnerService
  ) {}

  // CARGUE CONTROLADO DE PERSONAJES AL HACER SCROLL
  @HostListener('window:scroll')
  scrolling(): void {
    let spinnerOn = this.spinnerService.spinnerObservable.value.show;

    if (
      (window.pageYOffset > 1300 * this.pageCount ||
        this.document.documentElement.scrollTop > 1300 * this.pageCount) &&
      !spinnerOn
    ) {
      this.pageCount++;
      this.queryServiceService.chargeCharacters(this.pageCount);
    }
  }

  ngOnInit(): void {
    this.queryServiceService.getQueryCharacters();
    this.personajes$ = this.queryServiceService.personajes$;
  }

  // agregar o quitar de favoritos
  async favoriteToggle(personaje: Personaje) {
    let fav = personaje.isFavorite;
    personaje.isFavorite = !fav;
    await this.localStorageService.cambiarFavorito(personaje);
  }

  // Detalles del personaje elegido
  detallesPersonaje(personaje: Personaje) {
    Swal.fire({
      confirmButtonColor: '#007bff',
      title: `#${personaje.id} - ${personaje.name}`,
      imageUrl: personaje.image,
      imageHeight: 200,
      html: `<bold>Género:</bold> ${personaje.gender}<br>
        <bold>Estado:</bold> ${personaje.status}<br>
        <bold>Especie:</bold> ${personaje.species} <br>
        <bold>Tipo:</bold> ${personaje.type}<br>
        <bold>Género:</bold> ${personaje.gender}<br>
        <bold>Episodios:</bold> <a href="/episodios/${personaje.id}">Ver Episodios</a><br>
        <bold>Localización:</bold> <a href="/localizacion/${personaje.id}">Ver Localización<i class="fa fa-map-marker"></i></a>
        
        <style>
        bold{
          font-weight:bold;
          font-size:1.2em;
        }

        i{
          top:0;
          left:0;
          min-width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 25px !important;
        }

        a{
          color: #00f;
          text-decoration: none;
        }
        </style>`,
    }).then(() => this.spinnerService.hide());
  }
}
