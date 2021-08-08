export default class Logger {

    private source: string;

    constructor(source: string) {
        this.source = source;
    }

    public Log(message: string) {
        console.log(`INFO [${this.source}]: ${message}`);
    }

    public Warn(message: string) {
        console.log("\x1b[33m%s\x1b[0m", `🟠 [${this.source}]: ${message}`);
    }

    public Success(message: string) {
        console.log("\x1b[32m%s\x1b[0m", `🟢 [${this.source}]: ${message}`);
    }

    public ErrorLog(message: string) {
        console.log("\x1b[31m%s\x1b[0m", `🔴 [${this.source}]: ${message}`);
    }
}