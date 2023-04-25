import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleprodComponent } from './detalleprod.component';

describe('DetalleprodComponent', () => {
  let component: DetalleprodComponent;
  let fixture: ComponentFixture<DetalleprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleprodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
