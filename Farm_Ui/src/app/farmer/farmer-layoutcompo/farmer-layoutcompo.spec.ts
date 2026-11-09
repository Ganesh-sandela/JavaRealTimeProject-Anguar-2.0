import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerLayoutcompo } from './farmer-layoutcompo';

describe('FarmerLayoutcompo', () => {
  let component: FarmerLayoutcompo;
  let fixture: ComponentFixture<FarmerLayoutcompo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerLayoutcompo],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerLayoutcompo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
