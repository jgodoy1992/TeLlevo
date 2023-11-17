const { browser, by, element, ExpectedConditions } = require('protractor');

describe('Pagina Login', ()=>{
    beforeAll(()=>{
        browser.get('/')
    })

    it('debe ingresar usuario', ()=>{
        const EC = ExpectedConditions

        const usernameInput = element(by.css('ion-input[data-test="username-input"] input'))
        browser.wait(EC.presenceOf(usernameInput), 5000);
        browser.wait(EC.elementToBeClickable(usernameInput), 5000)

        usernameInput['sendKeys']('testUsername')

        const passwordInput = element(by.css('ion-input[data-test="password-input"] input'))
        browser.wait(EC.elementToBeClickable(passwordInput), 5000).then(() => {
            passwordInput['sendKeys']('testPassword')
        })

        const loginSubmitButton = element(by.css('[data-test="login-submit-button"]'))
        loginSubmitButton['click']()

        const homePageTitle = element(by.css('[data-test="home-titulo"]'));
        expect(homePageTitle['getAttribute']('innerText')).toEqual('TeLlevo')
    })
}) 