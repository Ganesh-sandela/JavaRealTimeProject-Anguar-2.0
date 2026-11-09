import { TestBed } from '@angular/core/testing';

import { Wishlistserv } from './wishlistserv';

describe('Wishlistserv', () => {
  let service: Wishlistserv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wishlistserv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
