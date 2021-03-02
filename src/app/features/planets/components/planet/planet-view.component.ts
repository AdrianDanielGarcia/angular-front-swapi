import { Component, Input, OnInit } from '@angular/core';
import { PlanetsService } from '@app/core/services/planets/planets.service';
import { IPlanet } from '@app/models/planet.model';

@Component({
  selector: 'app-planet-view',
  templateUrl: './planet-view.component.html',
  styleUrls: ['./planet-view.component.scss']
})
export class PlanetViewComponent implements OnInit {

  @Input() planet: IPlanet | any;
  @Input() selectedSortOption: string | null = '';

  constructor() { }

  ngOnInit(): void {
  }

}
