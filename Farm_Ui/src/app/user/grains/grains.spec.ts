import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grains } from './grains';

describe('Grains', () => {
  let component: Grains;
  let fixture: ComponentFixture<Grains>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grains],
    }).compileComponents();

    fixture = TestBed.createComponent(Grains);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
