export function log(message: string | number) {
    console.log('\x1b[36m%s\x1b[0m', `log: ${message}`)
}