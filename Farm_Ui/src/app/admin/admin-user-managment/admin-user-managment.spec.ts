import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserManagment } from './admin-user-managment';

describe('AdminUserManagment', () => {
  let component: AdminUserManagment;
  let fixture: ComponentFixture<AdminUserManagment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserManagment],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserManagment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
