import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productinfo } from './productinfo';

describe('Productinfo', () => {
  let component: Productinfo;
  let fixture: ComponentFixture<Productinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productinfo],
    }).compileComponents();

    fixture = TestBed.createComponent(Productinfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
