import { TestBed, inject } from '@angular/core/testing';

import { TasksResolverService } from './tasks-resolver.service';

describe('ActiveResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksResolverService]
    });
  });

  it('should be created', inject([TasksResolverService], (service: TasksResolverService) => {
    expect(service).toBeTruthy();
  }));
});
