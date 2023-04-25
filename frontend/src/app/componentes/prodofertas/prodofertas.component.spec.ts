import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOfertasComponent } from './prodofertas.component';

describe('ProdOfertasComponent', () => {
  let component: ProdOfertasComponent;
  let fixture: ComponentFixture<ProdOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdOfertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
