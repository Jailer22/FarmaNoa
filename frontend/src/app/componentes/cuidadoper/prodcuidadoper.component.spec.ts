import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCuidadoperComponent } from './prodcuidadoper.component';

describe('ProdCuidadoperComponent', () => {
  let component: ProdCuidadoperComponent;
  let fixture: ComponentFixture<ProdCuidadoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdCuidadoperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdCuidadoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
