import { test as base } from '@playwright/test'
import { loginPage, LoginPage } from '../pages/login.page'

/**
 * Fixtures for playwright use
 */
type pageFixtures = {
    loginPage: LoginPage
}

export const test = base.extend<pageFixtures>({
    ...loginPage
})

export { expect } from '@playwright/test'