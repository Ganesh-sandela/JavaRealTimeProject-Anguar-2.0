import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagemnet } from './admin-product-managemnet';

describe('AdminProductManagemnet', () => {
  let component: AdminProductManagemnet;
  let fixture: ComponentFixture<AdminProductManagemnet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductManagemnet],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductManagemnet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
