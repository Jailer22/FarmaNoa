import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdnutricionalComponent } from './prodnutricional.component';

describe('ProdnutricionalComponent', () => {
  let component: ProdnutricionalComponent;
  let fixture: ComponentFixture<ProdnutricionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdnutricionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdnutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
