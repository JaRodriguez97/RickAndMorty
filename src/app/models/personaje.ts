import { Episodio } from './episodio';
import { Localizacion } from './localizacion';

export interface Personaje {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: Episodio;
  location: Localizacion;
  origin: Localizacion;
  isFavorite?: boolean;
}
