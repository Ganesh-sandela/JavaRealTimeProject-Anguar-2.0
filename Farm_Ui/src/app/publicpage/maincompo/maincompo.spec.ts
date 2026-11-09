import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maincompo } from './maincompo';

describe('Maincompo', () => {
  let component: Maincompo;
  let fixture: ComponentFixture<Maincompo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maincompo],
    }).compileComponents();

    fixture = TestBed.createComponent(Maincompo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
