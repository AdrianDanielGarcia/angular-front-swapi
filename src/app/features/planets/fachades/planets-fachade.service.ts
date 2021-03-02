import { Injectable } from '@angular/core';
import { PlanetsService } from '@app/core/services/planets/planets.service';
import { IToolboxState, ToolboxStateService } from '@app/core/services/toolbox-state/toolbox-state.service';
import { IPlanet } from '@app/models/planet.model';
import { combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class PlanetsFachadeService {

  public planets$ = combineLatest([
        this.planetsService.getAll().pipe(shareReplay(1)),
        this.toolboxStateService.toolboxState$
      ]).pipe(
        map( ([planets, filterAndSortOptions]) =>
          this.filterAndSort(planets, filterAndSortOptions)
        )
      );

  public selectedSortOrder$ = this.toolboxStateService.selectedSortOrder$;

  constructor(
    private toolboxStateService: ToolboxStateService,
    private planetsService: PlanetsService
  ) {
    this.toolboxStateService.updateState({
      sortOrderOptions: [
        'No sort order',
        'Climate',
        'Diameter',
        'Gravity',
        'Name',
        'Orbital Period',
        'Population',
        'Rotation Period',
        'Surface Water',
        'Terrain',
      ]
    });
  }

  // TODO: refactor lot of code in global helper functions!!!!!
  // TODO: add reverse the order of the sort (ascending/descending). Only ascending is implemented
  filterAndSort(planets: IPlanet[], filterAndSortOptions: IToolboxState): IPlanet[] {

    // filter planets
    let filterAndSortedPlanets = planets;
    if (filterAndSortOptions.search && filterAndSortOptions.search !== '') {
      filterAndSortedPlanets = planets.filter(
        planet => planet.name.toUpperCase().includes(filterAndSortOptions.search.toUpperCase())
      );
    }

    // sort planets
    //  convert Option into field name
    const sortField = filterAndSortOptions.selectedSortOrder.toLowerCase().replace(' ', '_');

    if ( !['', 'no_sort_order'].includes(sortField)) {
      // sort numeric fields containing unknow values
      if (this.fieldWithUnknownValues(filterAndSortOptions.selectedSortOrder)) {
        const planetsWithUnknownValues = filterAndSortedPlanets.filter(planet =>
          (planet as any)[sortField] === 'unknown'
        );

        const planetsWithValues = filterAndSortedPlanets.filter(planet =>
          (planet as any)[sortField] !== 'unknown'
        );

        // unknown values at the end of the result
        filterAndSortedPlanets = [
          ...planetsWithValues.sort((a, b) => this.compareNumberValues(a, b, sortField) ),
          ...planetsWithUnknownValues
        ];
      } else {
        console.log(filterAndSortedPlanets, filterAndSortedPlanets.sort((a, b) => this.compareStringValues(a, b, sortField) ))
        filterAndSortedPlanets = filterAndSortedPlanets.sort((a, b) => this.compareStringValues(a, b, sortField) );
      }
    }

    return filterAndSortedPlanets;
  }

  private fieldWithUnknownValues(field: string): boolean {
    return [
      'Population',
      'Surface Water',
      'Orbital Period',
      'Rotation Period',
      'Diameter'
    ].includes(field);
  }

  private compareNumberValues(a: any, b: any, field: string): number {
    const aValue = Number(a[field].replace('.', '').replace(',', ''));
    const bValue = Number(b[field].replace('.', '').replace(',', ''));
    return aValue - bValue;
  }

  private compareStringValues(a: any, b: any, field: string): number {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  }
}
