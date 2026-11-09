import { TestBed } from '@angular/core/testing';

import { Userserv } from './userserv';

describe('Userserv', () => {
  let service: Userserv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userserv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
