import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Farmeraddproducts } from './farmeraddproducts';

describe('Farmeraddproducts', () => {
  let component: Farmeraddproducts;
  let fixture: ComponentFixture<Farmeraddproducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Farmeraddproducts],
    }).compileComponents();

    fixture = TestBed.createComponent(Farmeraddproducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
