import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiDbService } from '../services/api-db.service';
import { Observable, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { LoginPage } from '../login/login.page';


describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let apiServiceSpy: jasmine.SpyObj<any>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ApiDbService', ['registroUsuario']);

    TestBed.configureTestingModule({
      declarations: [RegistroPage, LoginPage],
      imports: [RouterTestingModule.withRoutes(
        [{ path: 'login', component: LoginPage }]
      ), FormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [{ provide: ApiDbService, useValue: spy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiDbService) as jasmine.SpyObj<any>
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar al metodo registroUsuario en registro', () => {
    const username = 'testUsername'
    const email = 'test@email.com'
    const password = 'testPassword'

    apiServiceSpy.registroUsuario.and.returnValue(of({}));

    // component.username = userData.username;
    // component.email = userData.email;
    // component.password = userData.password;

    component.registro(username, email, password);

    expect(apiServiceSpy.registroUsuario).toHaveBeenCalledWith(username, email, password);

  })


  it('debe navegar a /login cuando se registra exitosamente', async () => {
    const username = 'testUsername'
    const email = 'test@email.com'
    const password = 'testPassword'

    apiServiceSpy.registroUsuario.and.returnValue(of({}))

    const navigateSpy = spyOn((<any>component).router, 'navigate')

    // component.username = userData.username;
    // component.email = userData.email;
    // component.password = userData.password;

    await component.registro(username, email, password);

    expect(navigateSpy).toHaveBeenCalledWith(['/login'])

  })

  it('debe ingresar un error cuando el registro falla', () => {
    const username = 'testUsername'
    const email = 'test@email.com'
    const password = 'testPassword'

    const errorMessage = 'Registro fallido'

    apiServiceSpy.registroUsuario.and.returnValue(
      new Observable((observer) => {
        observer.error({ message: errorMessage })
      })
    )

    const consoleErrorSpy = spyOn(console, 'error')

    // component.username = userData.username;
    // component.email = userData.email;
    // component.password = userData.password;

    component.registro(username, email, password);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al registrar usuario', { message: errorMessage })

  })
});
