import { defineConfig, devices } from '@playwright/test'
import path from 'node:path'

require('dotenv').config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const isLoggerOn = false

export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    testIgnore: '**.d.ts',
    timeout: 2 * 60 * 1000,
    globalTimeout: 10 * 60 * 1000,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['list'], ['html', { open: 'never', outputFolder: path.resolve(__dirname, 'test-html-report/') }]],
    expect: {
        /* Maximum time expect() should wait for the condition to be met. */
        timeout: 10000
    },
    use: {
        baseURL: process.env.BASE_URL,
        actionTimeout: 30000,
        navigationTimeout: 60000,
        viewport: { width: 1920, height: 1080 },
        headless: true,
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        /* Test id attribute in DOM */
        //testIdAttribute: 'data-id',
        launchOptions: {
            /* Make timeout after each action in browser */
            slowMo: 50,
            downloadsPath: './downloads',
            logger: {
                isEnabled: (name, severity) => isLoggerOn,
                log: (name, severity, message, args) => console.log(`${severity}: ${message.toString()}`)
            }
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
    ]
})
