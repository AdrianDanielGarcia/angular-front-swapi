import { Injectable } from '@angular/core';
import { StateService } from '@app/core/classes/state.service';
import { CoreModule } from '@app/core/core.module';
import { Observable } from 'rxjs';


export interface IToolboxState {
  search: string;
  selectedSortOrder: string;
  wookiee: boolean;
  sortOrderOptions: string[];
}

const initialState: IToolboxState = {
  search: '',
  selectedSortOrder: '',
  wookiee: false,
  sortOrderOptions: []
};

@Injectable({
  providedIn: CoreModule
})
export class ToolboxStateService extends StateService<IToolboxState> {

  public toolboxState$: Observable<IToolboxState> = this.select(state => state);
  public search$: Observable<string> = this.select(state => state.search);
  public selectedSortOrder$: Observable<string> = this.select(state => state.selectedSortOrder);
  public sortOrderOptions$: Observable<string[]> = this.select(state => state.sortOrderOptions);

  constructor() {
    super(initialState);
  }

  updateState(toolboxState: Partial<IToolboxState>): void {
    this.setState(toolboxState);
  }

}
