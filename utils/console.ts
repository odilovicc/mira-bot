export class ConsoleUtils {
    public static log(message: string) {
        console.log(`[ℹ️ LOG]: ${message}`)
    }

    public static error(message: string) {
        console.error(`[❌ ERROR]: ${message}`)
    }

    public static warn(message: string) {
        console.warn(`[⚠️ WARNING]: ${message}`)
    }
    
    public static success(message: string) {
        console.log(`[✅ SUCCESS]: ${message}`)
    }

    public static debug(message: string) {
        console.debug(`[🐛 DEBUG]: ${message}`)
    }
}