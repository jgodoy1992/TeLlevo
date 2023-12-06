import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ApiDbService } from './api-db.service';

describe('ApiDbService', () => {
  let service: ApiDbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiDbService],
    });

    service = TestBed.inject(ApiDbService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe hacer un POST request para registrar un usuario', () => {

    const username = 'testUsernameApi';
    const email = 'testapi@email.com';
    const password = 'testPasswordApi';

    service.registroUsuario(username, email, password).subscribe();

    const req = httpMock.expectOne(`${service.apiUrl}registro`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, email, password });

  });

  it('debe realizar un POST request para el login de usuario', () => {

    const username = 'testUsernameApi';
    const password = 'testPasswordApi';

    service.login(username, password).subscribe();

    const req = httpMock.expectOne(`${service.apiUrl}ingreso`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });

  });

  it('debe mapear un respuesta de login', () => {

    const username = 'testUsernameApi';
    const password = 'testPasswordApi';
    const mockResponse = { token: 'fakeToken' };

    service.login(username, password).subscribe(response => {
      expect(response).toEqual('fakeToken');
    });

    const req = httpMock.expectOne(`${service.apiUrl}ingreso`);
    req.flush(mockResponse);

  })

});
