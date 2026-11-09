import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutcompo } from './admin-layoutcompo';

describe('AdminLayoutcompo', () => {
  let component: AdminLayoutcompo;
  let fixture: ComponentFixture<AdminLayoutcompo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutcompo],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLayoutcompo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
