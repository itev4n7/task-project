import { LoginLocators } from './locators/login.locators'
import { Page, PlaywrightTestArgs } from '@playwright/test'
import { expect } from '../common/fixtures'
import { User } from '../common/types'

export const loginPage = {
    loginPage: async ({ page }: PlaywrightTestArgs, use: (r: LoginPage) => void) => {
        use(new LoginPage(page))
    }
}

export class LoginPage extends LoginLocators {

    constructor(page: Page) {
        super(page)
    }

    async login(user: User) {
        await this.page.goto('/')
        await this.page.waitForLoadState('networkidle')
        await this.loginForm.waitFor({ state: 'visible' })
        await this.emailInput.type(user.email)
        await this.passwordInput.type(user.password)
        await this.submitButton.click()
        await expect(await this.errorMessage.count()).toEqual(0)
    }
}