import { Locator, Page } from '@playwright/test'

export class LoginLocators {
    readonly page: Page
    readonly loginForm: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly forgotPasswordButton: Locator

    constructor(page: Page) {
        this.page = page
        this.loginForm = page.locator('.login-form__top')
        this.emailInput = page.locator('[type="email"]')
        this.passwordInput = page.locator('[type="password"]')
        this.submitButton = page.locator('//button[normalize-space()="Log in"]')
        this.forgotPasswordButton = page.locator('//*[@href="/reset-password"]')
        this.errorMessage = page.locator('//*[@role="alert" and contains(.,"Wrong Email or password")]')
    }
}