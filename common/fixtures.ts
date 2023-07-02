import { test as base } from '@playwright/test'
import { loginPage, LoginPage } from '../pages/login.page'

/**
 * Fixtures for playwright use
 */
type extendPageObject = {
    loginPage: LoginPage
    //...more pages
}

export const test = base.extend<extendPageObject>({
    ...loginPage
})

export { expect } from '@playwright/test'