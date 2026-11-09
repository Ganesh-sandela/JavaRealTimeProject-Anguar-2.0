import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerNotifications } from './farmer-notifications';

describe('FarmerNotifications', () => {
  let component: FarmerNotifications;
  let fixture: ComponentFixture<FarmerNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerNotifications],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerNotifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
