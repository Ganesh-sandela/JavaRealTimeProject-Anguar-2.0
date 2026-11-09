import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerLogout } from './farmer-logout';

describe('FarmerLogout', () => {
  let component: FarmerLogout;
  let fixture: ComponentFixture<FarmerLogout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerLogout],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerLogout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
