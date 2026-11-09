import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Errorpageload } from './errorpageload';

describe('Errorpageload', () => {
  let component: Errorpageload;
  let fixture: ComponentFixture<Errorpageload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Errorpageload],
    }).compileComponents();

    fixture = TestBed.createComponent(Errorpageload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
