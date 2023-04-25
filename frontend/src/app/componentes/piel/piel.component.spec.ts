import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PielComponent } from './piel.component';

describe('PielComponent', () => {
  let component: PielComponent;
  let fixture: ComponentFixture<PielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
