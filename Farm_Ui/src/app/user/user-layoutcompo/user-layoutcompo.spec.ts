import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLayoutcompo } from './user-layoutcompo';

describe('UserLayoutcompo', () => {
  let component: UserLayoutcompo;
  let fixture: ComponentFixture<UserLayoutcompo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLayoutcompo],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLayoutcompo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
