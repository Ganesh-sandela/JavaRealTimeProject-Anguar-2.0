import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryManagement } from './admin-category-management';

describe('AdminCategoryManagement', () => {
  let component: AdminCategoryManagement;
  let fixture: ComponentFixture<AdminCategoryManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
