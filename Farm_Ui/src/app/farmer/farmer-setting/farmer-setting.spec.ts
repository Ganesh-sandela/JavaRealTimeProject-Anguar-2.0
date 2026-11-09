import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSetting } from './farmer-setting';

describe('FarmerSetting', () => {
  let component: FarmerSetting;
  let fixture: ComponentFixture<FarmerSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerSetting],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerSetting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
