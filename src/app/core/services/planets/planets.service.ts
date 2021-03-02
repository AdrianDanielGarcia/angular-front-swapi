import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IPlanet, IPlanetDTO } from '@models/planet.model';
import { CoreModule } from '@core/core.module';
import { environment } from 'environments/environment';
import { IItem, ItemTypes } from '@models/item.model';
import { IResponse } from '@app/models/response.models';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: CoreModule
})
export class PlanetsService {

  private url = `${environment.SW_BASE_URL}planets`; // TODO: format url & queries for production

  constructor(
    private http: HttpClient,
    private decimalPipe: DecimalPipe
  ) { }

  getAll(wookie: boolean = false): Observable<IPlanet[]> { // TODO: implement wookie query

    const filmsUrl = `${environment.SW_BASE_URL}films`;
    const residentsUrl = `${environment.SW_BASE_URL}people`;

    return forkJoin({
      planetsDTO: this.http.get<IResponse<IPlanetDTO>>(this.url),
      films: this.http.get<any>(filmsUrl), // TODO:  create films DTO type
      residents: this.http.get<any>(residentsUrl) // TODO: create DTO type
    }).pipe (
      mergeMap(firstPages => {
        return forkJoin({
          allPlanetsDTO: this.getAllPages<IPlanetDTO>(firstPages.planetsDTO, this.url),
          allResidentsDTO: this.getAllPages<any>(firstPages.residents, residentsUrl),
          allFilmsDTO: this.getAllPages<any>(firstPages.films, filmsUrl)
        });
      }),
      map(({allPlanetsDTO, allFilmsDTO, allResidentsDTO}) =>
        this.mapDTOToPlanets(allPlanetsDTO, allFilmsDTO, allResidentsDTO
      ))
    );
  }

  mapItemsToList(items: string[], listArray: any[],  type: ItemTypes, titleField: string): IItem[] {
    return items.map(itemUrl => {
      const segments = itemUrl.split('/');
      return {
        id:  Number(segments[segments.length - 2]),
        name: listArray.find(list => list.url === itemUrl)[titleField],
        type
      };
    });
  }

  mapDTOToPlanets(dtos: IPlanetDTO[], films: any[], residents: any[]): IPlanet[] {
    return dtos.map(dto => {
      return {
        created: new Date(dto.created),
        climate: dto.climate,
        diameter: this.tryFormatFieldToNumber(dto.diameter), // km
        edited: new Date(dto.edited),
        films: this.mapItemsToList(dto.films, films, ItemTypes.films, 'title'),
        gravity: dto.gravity,
        name: dto.name,
        orbital_period: this.tryFormatFieldToNumber(dto.orbital_period),
        population: this.tryFormatFieldToNumber(dto.population),
        residents: this.mapItemsToList(dto.residents, residents, ItemTypes.people, 'name'),
        rotation_period: this.tryFormatFieldToNumber(dto.rotation_period), // days
        surface_water: this.tryFormatFieldToNumber(dto.surface_water), // % surface
        terrain: dto.terrain,
        url: dto.url
      };
    });
  }

  private tryFormatFieldToNumber(field: string): string | null {
    return isNaN(Number(field))
    ? field
    : this.decimalPipe.transform(field);
  }

  private getAllPages<T>(firstPage: IResponse<T>, url: string, wookie: boolean = false): Observable<T[]> {
    const lastPage = (firstPage.count % 10 === 0) ? firstPage.count / 10 : firstPage.count / 10  + 1;
    const requests: Observable<T[]>[] = [];

    for (let i = 2; i <= lastPage; i++) {
      requests.push(
        this.http.get<IResponse<T>>(`${url}.${i}.json`)
        .pipe(
          map(result => result.results)
        )
      );
    }

    if (requests.length > 0) {
      return forkJoin(requests).pipe(
        map(requestedPages => ([] as T[]).concat(firstPage.results, ...requestedPages))
      );
    } else {
      return of(firstPage.results);
    }
  }
}
