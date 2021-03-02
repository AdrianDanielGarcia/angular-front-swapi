import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsComponent } from './planets.component';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetViewComponent } from './components/planet/planet-view.component';
import { PlanetsFachadeService } from './fachades/planets-fachade.service';

import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    PlanetsComponent,
    PlanetViewComponent
  ],
  imports: [
    CommonModule,
    PlanetsRoutingModule,
    MatExpansionModule
  ],
  providers: [
    PlanetsFachadeService
  ]
})
export class PlanetsModule { }
