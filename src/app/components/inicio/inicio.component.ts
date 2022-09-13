import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '@app/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Personaje } from '@app/models/personaje';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  personajesFavoritos!: Promise<Personaje[]>;

  constructor(
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {
    this.personajesFavoritos =
      this.localStorageService.getPersonajesFavoritos();
    this.spinner.hide();
  }

  ngOnInit(): void {}

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
    }).then(() => this.spinner.hide());
  }
}
