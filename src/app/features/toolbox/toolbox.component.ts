import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToolboxStateService } from '@app/core/services/toolbox-state/toolbox-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit, OnDestroy {

  private unsubscribeSignal: Subject<void> = new Subject<void>();

  public toolboxForm = new FormGroup({
    search: new FormControl(''),
    selectedSortOrder: new FormControl(''),
    wookiee: new FormControl({ value: false, disabled: true })
  });

  public sortOrderOptions$ = this.toolboxStateService.sortOrderOptions$;

  constructor(
    private toolboxStateService: ToolboxStateService
  ) { }

  ngOnInit(): void {

    this.toolboxForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribeSignal)
      ).subscribe({
        next: form => this.toolboxStateService.updateState(form)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.complete();
  }
}
