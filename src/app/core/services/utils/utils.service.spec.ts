import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UtilsService);
  });

  it('should capitalize string', () => {
    const str = 'hello world';

    expect(service.captalizeFirstLetter(str).trim()).toEqual('Hello World');
  });

  it('should generate a random code with 8 characters', () => {
    const code = service.generateRandomCode();

    expect(code.length).toEqual(8);
  });

  it('code should has only numbers', () => {
    const code = service.generateRandomCode();
    const regex = /^\d{8}$/;

    expect(regex.test(code)).toBeTruthy();
  });
});
