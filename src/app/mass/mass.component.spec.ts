import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassComponent } from './mass.component';

describe('ResultsComponent', () => {
  let component: MassComponent;
  let fixture: ComponentFixture<MassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MassComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
