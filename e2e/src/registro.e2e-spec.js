const { browser, by, element, ExpectedConditions } = require('protractor');

xdescribe('Pgina Registro', () => {
    beforeAll(() => {
        browser.get('/')
    })

    xit('debe navegar a la pagina de registro', () => {
        const botonRegistro = element(by.css('[data-test="boton-registro"]'))
        botonRegistro['click']()

        const registroTitulo = element(by.css('[data-test="titulo-registro"]'))
        expect(registroTitulo['getAttribute']('innerText')).toEqual('Registro de usuario')
    })

    xit('debe registrar nuevo usuario', () => {
        const EC = ExpectedConditions

        const usernameInput = element(by.css('ion-input[data-test="username-input"] input'))
        browser.wait(EC.presenceOf(usernameInput), 5000);
        browser.wait(EC.elementToBeClickable(usernameInput), 5000)

        usernameInput['sendKeys']('testUsername')

        const emailInput = element(by.css('ion-input[data-test="email-input"] input'))
        browser.wait(EC.elementToBeClickable(emailInput), 5000).then(() => {
            emailInput['sendKeys']('test@email.com')
        });

        const passwordInput = element(by.css('ion-input[data-test="password-input"] input'))
        browser.wait(EC.elementToBeClickable(passwordInput), 5000).then(() => {
            passwordInput['sendKeys']('testPassword')
        })

        const registerSubmitButton = element(by.css('[data-test="register-submit-button"]'))
        registerSubmitButton['click']()

        const loginPageTitle = element(by.css('[data-test="login-titulo"]'));
        expect(loginPageTitle['getAttribute']('innerText')).toEqual('TeLlevo')
    })
})