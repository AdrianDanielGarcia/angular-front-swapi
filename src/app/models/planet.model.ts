import { IItem } from '@models/item.model';

export interface IPlanetDTO {
  climate: string;
  created: string;
  diameter: string; // km
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string; // hours
  population: string;
  residents: string[];
  rotation_period: string; // days
  surface_water: string; // % surface
  terrain: string;
  url: string;
}

export interface IPlanet {
  climate: string;
  created: Date;
  diameter: string | null; // km
  edited: Date;
  films: IItem[];
  gravity: string;
  name: string;
  orbital_period: string | null;
  population: string | null;
  residents: IItem[];
  rotation_period: string | null; // days
  surface_water: string | null; // % surface
  terrain: string;
  url: string;
}
