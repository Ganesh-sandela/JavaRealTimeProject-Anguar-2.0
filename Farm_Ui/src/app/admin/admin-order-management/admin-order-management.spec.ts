import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderManagement } from './admin-order-management';

describe('AdminOrderManagement', () => {
  let component: AdminOrderManagement;
  let fixture: ComponentFixture<AdminOrderManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOrderManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
