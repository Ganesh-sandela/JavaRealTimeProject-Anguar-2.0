import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebarfarmer } from './sidebarfarmer';

describe('Sidebarfarmer', () => {
  let component: Sidebarfarmer;
  let fixture: ComponentFixture<Sidebarfarmer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebarfarmer],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebarfarmer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
