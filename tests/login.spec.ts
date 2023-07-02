import { expect, test } from '../common/fixtures'
import { UserSamples } from '../data-repository/user/user-samples'
import { UserBuilder } from '../data-repository/user/user-builder'

test('Check login process', async ({ page, loginPage }) => {
    await loginPage.login(UserSamples.getBaseUser())
    await page.waitForLoadState('networkidle')
})

test('Check error message while login process', async ({ page, loginPage }) => {
    const invalidUser = new UserBuilder().setEmail('non@mail.com').setPassword('test1pass2').build()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await loginPage.loginForm.waitFor({ state: 'visible' })
    await loginPage.emailInput.type(invalidUser.email)
    await loginPage.passwordInput.type(invalidUser.password)
    await loginPage.submitButton.click()
    await expect(await loginPage.errorMessage).toBeVisible({ timeout: 5000 })
})