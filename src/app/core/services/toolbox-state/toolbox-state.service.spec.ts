import { TestBed } from '@angular/core/testing';

import { ToolboxStateService } from './toolbox-state.service';

describe('ToolboxStateService', () => {
  let service: ToolboxStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolboxStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
