export default class Parameter {
    type: string | undefined;
    options: number[] = [];

    constructor(type: string, options: number[]) {
        this.type = type;
        this.options = options;
    }

    GetLine(): string {
        let line = ` ${this.type}`;
        this.options.forEach(option => {
            line += `,${option}`;
        });
        return line;
    }
}
