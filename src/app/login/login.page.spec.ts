import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacionService } from '../services/autenticacion.service';
import { of } from 'rxjs';
import { ApiDbService } from '../services/api-db.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { HomePage } from '../home/home.page';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let apiServiceSpy: jasmine.SpyObj<any>
  let autenticacionServiceSpy: jasmine.SpyObj<AutenticacionService>

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('ApiDbService', ['login'])
    const authSpy = jasmine.createSpyObj('AutenticacionService', ['getBoolAuthVal', 'returnVal'])

    TestBed.configureTestingModule({
      declarations: [LoginPage, HomePage],
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'home', component: HomePage }]
      ), FormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [
        { provide: ApiDbService, useValue: apiSpy },
        { provide: AutenticacionService, useValue: authSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiDbService) as jasmine.SpyObj<any>
    autenticacionServiceSpy = TestBed.inject(AutenticacionService) as jasmine.SpyObj<AutenticacionService>
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar al metodo login al ingresar', () => {
    const username = 'testUsername'
    const password = 'testPassword'

    apiServiceSpy.login.and.returnValue(of(true))

    // component.username = username
    // component.password = password

    component.login(username, password);

    expect(apiServiceSpy.login).toHaveBeenCalledWith(username, password)
  })

  it('debe navegar a la /home cuando ingrese exitosamente', async () => {
    const username = 'testUsername'
    const password = 'testPassword'

    // component.username = username;
    // component.password = password;

    apiServiceSpy.login.and.returnValue(of(true))
    autenticacionServiceSpy.returnVal.and.returnValue(true)

    const navigateSpy = spyOn((<any>component).router, 'navigate');

    await component.login(username, password);

    expect(navigateSpy).toHaveBeenCalledWith(['/home'], {
      state: { username: username },
    });
  })

  it('debe ingresar error cuando el ingreso falle', () => {
    const username = 'testUsername';
    const password = 'testPassword';
    const errorMessage = 'Login fallido';

    apiServiceSpy.login.and.returnValue(
      of(false)
    );

    const consoleErrorSpy = spyOn(console, 'error');

    // component.username = username;
    // component.password = password;

    component.login(username, password);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Inicio de sension fallido');
  });
});
