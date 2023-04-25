import { TestBed } from '@angular/core/testing';

import { SubirarchivosService } from './subirarchivos.service';

describe('SubirarchivosService', () => {
  let service: SubirarchivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirarchivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
