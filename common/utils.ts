import { BrowserContext, Page, FileChooser, Locator, type TestInfo, Download } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import { log } from '../loggers/console_logger'


export async function clickOnUploadButtonAndGetFileChooser(
    page: Page,
    uploadButton: Locator
): Promise<FileChooser> {
    log('click on upload button and return "FileChooser"')
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        uploadButton.click()
    ])
    return fileChooser
}

export async function clickOnDownloadButtonAndGetDownloadFile(
    page: Page,
    downloadButton: Locator
): Promise<Download> {
    log('click on download button and return "Download"')
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        downloadButton.click()
    ])
    return download
}

export async function clickOnBlankButtonAndGetNewPage(
    context: BrowserContext,
    blankButton: Locator
): Promise<Page> {
    log('click on blank button and return "Page"')
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blankButton.click()
    ])
    return newPage
}

export async function removeDownloadsFolder() {
    log('removing downloads folder')
    const downloadsPath: string = path.join(__dirname, '../downloads')
    try {
        fs.rmSync(downloadsPath, { recursive: true })
    } catch (err) {
        console.error(`Error while deleting ${downloadsPath}.`)
    }
}

export async function saveScreenshotOnFailure(page: Page, testInfo: TestInfo) {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshotPath: string = testInfo.outputPath('failure.png')
        testInfo.attachments.push({
            name: 'screenshot',
            path: screenshotPath,
            contentType: 'image/png'
        })
        await page.screenshot({ path: screenshotPath, timeout: 5000 })
    }
}

