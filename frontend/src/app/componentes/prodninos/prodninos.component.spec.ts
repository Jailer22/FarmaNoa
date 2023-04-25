import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdninosComponent } from './prodninos.component';

describe('ProdNinosComponent', () => {
  let component: ProdninosComponent;
  let fixture: ComponentFixture<ProdninosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdninosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdninosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
