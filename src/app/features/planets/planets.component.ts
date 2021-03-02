import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '@app/core/services/planets/planets.service';
import { PlanetsFachadeService } from './fachades/planets-fachade.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent {

  public planets$ = this.planetsFachadeService.planets$;
  public selectedSortOption$ = this.planetsFachadeService.selectedSortOrder$;

  constructor(
    private planetsFachadeService: PlanetsFachadeService
  ) { }

}
