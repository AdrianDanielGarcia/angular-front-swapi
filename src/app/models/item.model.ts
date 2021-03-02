export interface IItem {
  id: number;
  name: string;
  type: ItemTypes;
}

export enum ItemTypes {
  films,
  people,
  planet,
  species,
  starships,
  vehicles
}
