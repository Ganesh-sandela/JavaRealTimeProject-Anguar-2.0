import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMyproducts } from './farmer-myproducts';

describe('FarmerMyproducts', () => {
  let component: FarmerMyproducts;
  let fixture: ComponentFixture<FarmerMyproducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerMyproducts],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerMyproducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
