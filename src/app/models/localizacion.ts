import { Personaje } from './personaje';

export interface Localizacion {
  id: string;
  name: string;
  dimension: string;
  residents: Personaje;
  created: string;
}
